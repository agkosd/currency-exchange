import Input from 'Components/Input';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Input Component', () => {
  test('renders input Component', () => {
    render(<Input isLatestRates={true} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
  });

  test('input disabled if isLatestRates is true', () => {
    render(<Input isLatestRates={true} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeDisabled();
    expect(input).toHaveValue(1);
  });

  test('input not disabled if isLatest is false', () => {
    render(<Input isLatestRates={false} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeEnabled();
    fireEvent.change(input, { target: { value: 0 } });
    expect(input).toHaveValue(1);
    fireEvent.change(input, { target: { value: 4 } });
    expect(input).toHaveValue(4);
  });
});
