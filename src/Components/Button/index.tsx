import Button from '@mui/material/Button';

interface ButtonProps {
  text: string;
}

const CustomButton = ({ text }: ButtonProps) => {
  return (
    <Button variant="contained" type="submit">
      {text}
    </Button>
  );
};

export default CustomButton;
