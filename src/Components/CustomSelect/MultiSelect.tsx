import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

interface MultiSelectProps {
  currencyKeys: string[];
}

const MultiSelect = ({ currencyKeys }: MultiSelectProps) => {
  const [currency, setCurrency] = useState<string[]>([]);

  const handleMultipleSelectChange = (
    event: SelectChangeEvent<typeof currency>,
  ) => {
    const {
      target: { value },
    } = event;
    setCurrency(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="currency-select-list-label">Currency List</InputLabel>
      <Select
        labelId="currency-select-list-label"
        id="currency-select-list"
        label="Currency List"
        value={currency}
        multiple={true}
        onChange={handleMultipleSelectChange}
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

export default MultiSelect;
