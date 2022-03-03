import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';

interface CustomSelectProps {
  currencyKeys: string[];
  isMultipleSelect?: boolean;
}

const CustomSelect = ({
  currencyKeys,
  isMultipleSelect,
}: CustomSelectProps) => {
  return isMultipleSelect ? (
    <MultiSelect currencyKeys={currencyKeys} />
  ) : (
    <SingleSelect currencyKeys={currencyKeys} />
  );
};

export default CustomSelect;
