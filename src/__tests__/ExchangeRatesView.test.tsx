import App from 'App';

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

describe('App', () => {
  test('app navigation', async () => {
    render(<App />, { wrapper: Router });
    const [latestLink, convertLink] = screen.getAllByRole('link');

    userEvent.click(latestLink);
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
    expect(screen.getByRole('spinbutton')).toBeDisabled();

    userEvent.click(convertLink);
    expect(screen.getByRole('spinbutton')).toBeEnabled();
  });
});
