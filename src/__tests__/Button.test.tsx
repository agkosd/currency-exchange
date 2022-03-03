import Button from 'Components/Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  test('renders button component', () => {
    render(<Button text="Latest Rates" />);
    expect(screen.getByRole('button')).toHaveTextContent('Latest Rates');
  });
});
