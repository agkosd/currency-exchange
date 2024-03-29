import { useState, useEffect } from 'react';

import { CurrencyApi } from 'Apis/index';
import { Link, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Button from 'Components/Button';
import Select from 'Components/CustomSelect';
import Input from 'Components/Input';
import ResultComp from 'Components/Result';

type Result = Array<{
  from: string;
  to: string;
  amount: number;
  result: number;
}>;

const ButtonText = {
  '/currency-conversion': 'Convert',
  '/latest-rates': 'Latest Rates',
} as const;

type PathName = keyof typeof ButtonText;

const formatResults = (
  results: Record<string, number>,
  from: string,
): Result => {
  return Object.entries(results).map(([to, result]) => ({
    from,
    to,
    amount: 1,
    result,
  }));
};

const ExchangeRates = () => {
  const { pathname } = useLocation();
  const [currencyList, setCurrencyList] = useState<Record<string, string>>(() =>
    localStorage.getItem('currencyList')
      ? JSON.parse(localStorage.getItem('currencyList') as string)
      : {},
  );
  const isLatestRates = pathname.includes('latest-rates');
  const [results, setResults] = useState<Result>([]);

  const [status, setStatus] = useState<
    'Idle' | 'Loading' | 'Error' | 'Success'
  >('Idle');

  const handleCurrencyConversion = async (
    num: number,
    from: string,
    to: string,
  ) => {
    try {
      setStatus('Loading');
      const response = await CurrencyApi.convertCurrency(from, to, num);
      const { result } = response;
      setResults([{ from, to, amount: num, result }]);
      setStatus('Success');
    } catch (e) {
      setStatus('Error');
    }
  };

  const handleLatestRates = async (from: string, to: string) => {
    try {
      setStatus('Loading');
      const response = await CurrencyApi.getLatestRates(from, to);
      const res = formatResults(response.rates, from);
      setResults(res);
      setStatus('Success');
    } catch (e) {
      setStatus('Error');
    }
  };

  useEffect(() => {
    const fetchInitialList = async () => {
      try {
        setStatus('Loading');
        const response = await CurrencyApi.getSymbols();
        const { symbols } = response;
        localStorage.setItem('currencyList', JSON.stringify(symbols));
        setStatus('Success');
        setCurrencyList(symbols);
      } catch (e) {
        console.log(e);
        setStatus('Error');
      }
    };
    if (!localStorage.getItem('currencyList')) {
      fetchInitialList();
    }
  }, []);

  if (status === 'Loading') {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          background: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'Error') {
    return (
      <Box>
        something went wrong please <Link to="/">try again</Link>
      </Box>
    );
  }

  return (
    <Box>
      <form
        onSubmit={e => {
          e.preventDefault();
          const [currNum, baseCurr, , targetCurr] = Array.from(
            (e.target as HTMLFormElement).elements,
          );
          const [num, from, to] = [
            +(currNum as HTMLInputElement).value,
            (baseCurr as HTMLInputElement).value,
            (targetCurr as HTMLInputElement).value,
          ];
          if (!from || !to) {
            alert('Select a value');
            return;
          }
          if (!isLatestRates) {
            handleCurrencyConversion(num, from, to);
          } else {
            handleLatestRates(from, to);
          }
        }}
      >
        <Input isLatestRates={isLatestRates} />
        <Select
          currencyKeys={Object.keys(currencyList)}
          isMultipleSelect={false}
        />
        <Select
          currencyKeys={Object.keys(currencyList)}
          isMultipleSelect={isLatestRates}
        />
        <Button text={ButtonText[pathname as PathName]} />
      </form>
      {status === 'Success' && results.length && (
        <ResultComp results={results} />
      )}
    </Box>
  );
};

export default ExchangeRates;
