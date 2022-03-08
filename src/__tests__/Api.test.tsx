import App from 'App';
import { setupServer } from 'msw/node';
import {
  handlers,
  latestRatesExceptionHandler,
  convertExceptionHandler,
} from 'Apis/handlers';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  cleanup,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

afterEach(cleanup);

describe('Exchange Rates view', () => {
  test('fetches symbols and loads inside the select component', async () => {
    render(<App />, { wrapper: Router });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
    const curr = {
      AED: 'United Arab Emirates Dirham',
      AFN: 'Afghan Afghani',
      ALL: 'Albanian Lek',
      AMD: 'Armenian Dram',
      GBP: 'British Pound Sterling',
      JPY: 'Japanese yen',
      EUR: 'Euro',
      USD: 'United States Dollar',
    };
    const [select1, select2] = screen.getAllByRole(/button/i, {
      name: /currency list/i,
    });

    const selectItems = Object.keys(curr);

    userEvent.click(select1);
    expect(screen.getAllByRole('option')).toHaveLength(selectItems.length);
    userEvent.click(select2);
    expect(screen.getAllByRole('option')).toHaveLength(selectItems.length);

    const options = screen
      .getAllByRole('option')
      .map(option => option.textContent);
    expect(options).toEqual(selectItems);
  });

  test('fetches latest rates and shows the result', async () => {
    render(<App />, { wrapper: Router });
    const latestRatesUrl = screen.getAllByRole('link')[0];
    userEvent.click(latestRatesUrl);
    const getLatestRatesBtn = screen.getByRole('button', {
      name: /latest rates/i,
    });

    const [baseList, targetList] = screen.getAllByRole('button', {
      name: /currency list /i,
    });

    userEvent.click(baseList);
    await waitFor(() => userEvent.click(screen.getByText('USD')));

    userEvent.click(targetList);
    await waitFor(() => userEvent.click(screen.getByText('GBP')));
    await waitFor(() => userEvent.click(screen.getByText('JPY')));
    await waitFor(() => userEvent.click(screen.getByText('EUR')));

    await waitFor(() => userEvent.click(getLatestRatesBtn));
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
    const items = screen
      .getAllByTestId('result-item')
      .map(item => item.textContent);
    expect(items).toMatchInlineSnapshot(`
      Array [
        "1USD = 0.72007GBP",
        "1USD = 107.346001JPY",
        "1USD = 0.813399EUR",
      ]
    `);
  });

  test('does the conversion and shows the result', async () => {
    render(<App />, { wrapper: Router });
    const convertUrl = screen.getAllByRole('link')[1];
    userEvent.click(convertUrl);
    const convertBtn = screen.getByRole('button', {
      name: /convert/i,
    });

    const [baseList, targetList] = screen.getAllByRole('button', {
      name: /currency list /i,
    });

    userEvent.type(screen.getByRole('spinbutton'), '20');

    userEvent.click(baseList);
    await waitFor(() => userEvent.click(screen.getByText('GBP')));

    userEvent.click(targetList);
    await waitFor(() => userEvent.click(screen.getByText('JPY')));

    await waitFor(() => userEvent.click(convertBtn));
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
    const items = screen
      .getAllByTestId('result-item')
      .map(item => item.textContent);
    expect(items).toMatchInlineSnapshot(`
      Array [
        "120GBP = 3724.305775JPY",
      ]
    `);
  });

  test('displays error message on failure of latest rates api', async () => {
    server.use(latestRatesExceptionHandler);

    render(<App />, { wrapper: Router });
    const latestRatesUrl = screen.getAllByRole('link')[0];
    userEvent.click(latestRatesUrl);
    const getLatestRatesBtn = screen.getByRole('button', {
      name: /latest rates/i,
    });

    const [baseList, targetList] = screen.getAllByRole('button', {
      name: /currency list /i,
    });

    userEvent.click(baseList);
    await waitFor(() => userEvent.click(screen.getByText('USD')));

    userEvent.click(targetList);
    await waitFor(() => userEvent.click(screen.getByText('GBP')));

    await waitFor(() => userEvent.click(getLatestRatesBtn));
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('displays error message on failure of convert api', async () => {
    server.use(convertExceptionHandler);

    render(<App />, { wrapper: Router });
    const convertUrl = screen.getAllByRole('link')[1];
    userEvent.click(convertUrl);
    const convertBtn = screen.getByRole('button', {
      name: /convert/i,
    });

    const [baseList, targetList] = screen.getAllByRole('button', {
      name: /currency list /i,
    });

    userEvent.type(screen.getByRole('spinbutton'), '20');

    userEvent.click(baseList);
    await waitFor(() => userEvent.click(screen.getByText('GBP')));

    userEvent.click(targetList);
    await waitFor(() => userEvent.click(screen.getByText('JPY')));

    await waitFor(() => userEvent.click(convertBtn));
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('incomplete values results in an alert', async () => {
    global.alert = jest.fn();
    render(<App />, { wrapper: Router });
    const convertUrl = screen.getAllByRole('link')[1];
    userEvent.click(convertUrl);
    const convertBtn = screen.getByRole('button', {
      name: /convert/i,
    });

    const baseList = screen.getAllByRole('button', {
      name: /currency list /i,
    })[0];

    userEvent.type(screen.getByRole('spinbutton'), '20');

    userEvent.click(baseList);
    await waitFor(() => userEvent.click(screen.getByText('GBP')));

    await waitFor(() => userEvent.click(convertBtn));
    expect(global.alert).toBeCalledTimes(1);
  });
});
