import Result from 'Components/Result';
import { render } from '@testing-library/react';

describe('Result Component', () => {
  test('it renders no result if result is empty', () => {
    const { getByText } = render(<Result results={[]} />);
    expect(getByText(/search to get results/i)).toBeInTheDocument();
  });

  test('it renders correct output', () => {
    const results = [
      {
        from: 'USD',
        to: 'INR',
        amount: 1,
        result: 75,
      },
      {
        from: 'EUR',
        to: 'INR',
        amount: 1,
        result: 100,
      },
    ];
    const { getByText } = render(<Result results={results} />);
    expect(getByText(/1usd = 75inr/i)).toBeInTheDocument();
    expect(getByText(/1eur = 100inr/i)).toBeInTheDocument();
  });
});
