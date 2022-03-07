import { useState, useEffect } from 'react';

import { CurrencyApi } from 'Apis/index';

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
  const [currencyList, setCurrencyList] = useState<Record<string, string>>(() =>
    localStorage.getItem('currencyList')
      ? JSON.parse(localStorage.getItem('currencyList') as string)
      : {},
  );
  const isLatestRates = true;
  const [results, setResults] = useState<Result>([]);
  const [inputValue, setInputValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
        setCurrencyList(symbols);
        setStatus('Success');
      } catch (e) {
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
          if (true) {
            handleCurrencyConversion(num, from, to);
          } else {
            handleLatestRates(from, to);
          }
        }}
      >
        <Input isLatestRates={true} />
        <Select
          currencyKeys={Object.keys(currencyList)}
          isMultipleSelect={false}
        />
        <Select
          currencyKeys={Object.keys(currencyList)}
          isMultipleSelect={true}
        />
        <Button text={'Latest Rates'} />
      </form>
      {status === 'Success' && <ResultComp results={results} />}
    </Box>
  );
};

export default ExchangeRates;
