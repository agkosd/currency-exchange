import CustomSelect from 'Components/CustomSelect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Custom Select', () => {
  const currencyKeys = ['USD', 'INR', 'AUD', 'ALL', 'EUR'];

  test('Renders Single Select', async () => {
    render(
      <CustomSelect currencyKeys={currencyKeys} isMultipleSelect={false} />,
    );
    const currList = screen.getByRole('button');
    userEvent.click(currList);
    expect(screen.getAllByRole('option')).toHaveLength(5);
    await waitFor(() => userEvent.click(screen.getByText(/inr/i)));
    expect(screen.getByRole('button')).toHaveTextContent(/inr/i);
    await waitFor(() => userEvent.click(screen.getByText(/usd/i)));
    expect(screen.getByRole('button')).toHaveTextContent(/usd/i);
  });

  test('Renders Multiple Select', async () => {
    render(
      <CustomSelect currencyKeys={currencyKeys} isMultipleSelect={true} />,
    );
    const currList = screen.getByRole('button');

    userEvent.click(currList);

    expect(screen.getAllByRole('option')).toHaveLength(5);
    await waitFor(() => userEvent.click(screen.getByText('INR')));
    await waitFor(() => userEvent.click(screen.getByText('USD')));

    userEvent.click(currList);
    expect(screen.getAllByRole('option', { selected: true })).toHaveLength(2);
    expect(
      (screen.getByRole('option', { name: 'INR' }) as HTMLOptionElement)
        .selected,
    ).toBe(true);
    expect(
      (screen.getByRole('option', { name: 'USD' }) as HTMLOptionElement)
        .selected,
    ).toBe(true);

    userEvent.click(currList);

    await waitFor(() => userEvent.click(screen.getByText('INR')));
    expect(
      (screen.getByRole('option', { name: 'USD' }) as HTMLOptionElement)
        .selected,
    ).toBe(true);

    userEvent.click(currList);

    expect(screen.getAllByRole('option', { selected: true })).toHaveLength(1);
  });
});
