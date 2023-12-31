const FileType = require('file-type');
const Sequelize = require('sequelize');
const fs = require('node:fs');
const path = require('node:path');
const config = require('config');
const { randomString } = require('../shared/generator');
const FileAttachment = require('../models/FileAttachment');
const Hoax = require('../models/Hoax');

const { uploadDir, profileDir, attachmentDir } = config;
const profileFolder = path.join('.', uploadDir, profileDir);
const attachmentFolder = path.join('.', uploadDir, attachmentDir);

const createFolders = () => {
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  if (!fs.existsSync(profileFolder)) fs.mkdirSync(profileFolder);
  if (!fs.existsSync(attachmentFolder)) fs.mkdirSync(attachmentFolder);
};

const saveProfileImage = async (base64File) => {
  const filename = randomString(32);
  const filePath = path.join(profileFolder, filename);
  await fs.promises.writeFile(filePath, base64File, 'base64');
  return filename;
};

const deleteProfileImage = async (filename) => {
  const filePath = path.join(profileFolder, filename);
  await fs.promises.unlink(filePath);
};

const isLessThan2MB = (buffer) => {
  return buffer.length < 2 * 1024 * 1024;
};

const isSupportedFileType = async (buffer) => {
  const type = await FileType.fileTypeFromBuffer(buffer);
  return !type
    ? false
    : type.mime === 'image/png' || type.mime === 'image/jpeg';
};

const saveAttachment = async (file) => {
  const type = await FileType.fileTypeFromBuffer(file.buffer);
  let fileType;
  let filename = randomString(32);
  if (type) {
    fileType = type.mime;
    filename += `.${type.ext}`;
  }
  await fs.promises.writeFile(
    path.join(attachmentFolder, filename),
    file.buffer
  );
  const savedAttachment = await FileAttachment.create({
    filename,
    fileType,
    uploadDate: new Date(),
  });
  return {
    id: savedAttachment.id,
  };
};

const associateFileToHoax = async (attachmentId, hoaxId) => {
  const attachment = await FileAttachment.findByPk(attachmentId);
  if (!attachment) return;
  if (attachment.hoaxId) return;
  await attachment.update({ hoaxId });
};

const removeUnusedAttachments = async () => {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  setInterval(async () => {
    const oneDayOld = new Date(Date.now() - ONE_DAY);
    const attachments = await FileAttachment.findAll({
      where: {
        uploadDate: {
          [Sequelize.Op.lt]: oneDayOld,
        },
        hoaxId: {
          [Sequelize.Op.is]: null,
        },
      },
    });
    for (const attachment of attachments) {
      const { filename } = attachment.get({ plain: true });
      await fs.promises.unlink(path.join(attachmentFolder, filename));
      await attachment.destroy();
    }
  }, ONE_DAY);
};

const deleteAttachment = async (filename) => {
  const filePath = path.join(attachmentFolder, filename);
  try {
    await fs.promises.access(filePath);
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.error(error);
  }
};

const deleteUserFiles = async (user) => {
  if (user.image) await deleteProfileImage(user.image);
  const attachments = await FileAttachment.findAll({
    attributes: ['filename'],
    include: {
      model: Hoax,
      where: {
        userId: user.id,
      },
    },
  });
  if (attachments.length === 0) return;
  for (const attachment of attachments) {
    await deleteAttachment(attachment.getDataValue('filename'));
  }
};

module.exports = {
  createFolders,
  saveProfileImage,
  deleteProfileImage,
  isLessThan2MB,
  isSupportedFileType,
  saveAttachment,
  associateFileToHoax,
  removeUnusedAttachments,
  deleteAttachment,
  deleteUserFiles,
};
