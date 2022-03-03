import Input from '@mui/material/Input';
import { useState } from 'react';

interface CustomInputProps {
  isLatestRates: boolean;
}

const CustomInput = ({ isLatestRates }: CustomInputProps) => {
  const [inputValue, setInputValue] = useState(1);

  return (
    <Input
      type="number"
      value={inputValue}
      onChange={e => {
        if (+e.target.value < 1) {
          return;
        }
        setInputValue(+e.target.value);
      }}
      disabled={isLatestRates}
    />
  );
};

export default CustomInput;
