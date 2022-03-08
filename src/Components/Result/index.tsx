import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface ResultObj {
  from: string;
  to: string;
  amount: number;
  result: number;
}

interface ResultProps {
  results: Array<ResultObj>;
}

const Result = ({ results }: ResultProps) => {
  if (!results.length) {
    return <Typography variant="h6">Search to get results</Typography>;
  }
  return (
    <Paper elevation={3}>
      {results.map(({ from, to, amount, result }, idx) => (
        <Box
          data-testid="result-item"
          sx={{ padding: '2rem' }}
          key={`${from}-${idx}-${to}`}
        >{`${amount}${from} = ${result}${to}`}</Box>
      ))}
    </Paper>
  );
};

export default Result;
