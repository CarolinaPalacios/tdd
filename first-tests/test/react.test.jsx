import { describe, it, afterEach, expect } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Calculator, numbers, operations, equalSign } from '../src/Calculator';

describe('Calculator', () => {
  afterEach(cleanup);

  it('should render', () => {
    render(<Calculator />);
  });

  it('should render title correctly', () => {
    render(<Calculator />);
    screen.getByText('Calculator');
  });

  it('should render numbers', () => {
    render(<Calculator />);
    numbers.forEach((number) => {
      screen.getByText(number);
    });
  });

  it('should render 4 rows', () => {
    render(<Calculator />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4);
  });

  it('should render operations', () => {
    render(<Calculator />);
    operations.forEach((operation) => {
      screen.getByText(operation);
    });
  });

  it('should render equal sign', () => {
    render(<Calculator />);
    screen.getByText('=');
  });

  it('should render an input', () => {
    render(<Calculator />);
    screen.getByRole('textbox');
  });

  it('should user input after clicking on a number', () => {
    render(<Calculator />);

    const one = screen.getByText(1);
    fireEvent.click(one);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1');
  });

  it('should user input after clicking several numbers', () => {
    render(<Calculator />);

    const one = screen.getByText(1);
    fireEvent.click(one);

    const two = screen.getByText(2);
    fireEvent.click(two);

    const three = screen.getByText(3);
    fireEvent.click(three);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('123');
  });

  it('should show user input after clicking numbers and operations', () => {
    render(<Calculator />);

    const one = screen.getByText(1);
    fireEvent.click(one);

    const plus = screen.getByText('+');
    fireEvent.click(plus);
    fireEvent.click(one);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('1+1');
  });

  it('should calculate based on user input and show the result', () => {
    render(<Calculator />);

    const one = screen.getByText(1);
    fireEvent.click(one);

    const plus = screen.getByText('+');
    fireEvent.click(plus);

    fireEvent.click(one);

    const equal = screen.getByText(equalSign);
    fireEvent.click(equal);

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('2');
  });
});
