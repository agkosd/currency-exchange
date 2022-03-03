import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface CustomSelectProps {
  currencyKeys: string[];
  isMultipleSelect?: boolean;
}

const CustomSelect = ({
  currencyKeys,
  isMultipleSelect,
}: CustomSelectProps) => {
  const [currency, setCurrency] = useState<string>('');

  const handleSingleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setCurrency(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="currency-select-list-label">Currency List</InputLabel>
      <Select
        labelId="currency-select-list-label"
        id="currency-select-list"
        label="Currency List"
        value={currency}
        multiple={isMultipleSelect}
        onChange={handleSingleSelectChange}
      >
        {currencyKeys.map(currencyKey => (
          <MenuItem value={currencyKey} key={currencyKey}>
            {currencyKey}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
