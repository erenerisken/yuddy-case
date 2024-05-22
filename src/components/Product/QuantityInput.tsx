import { isFinite, parseInt } from 'lodash';
import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { sharedColors } from '../../utils/Style';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface QuantityInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

const QuantityInput = (props: QuantityInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [plainTextValue, setPlainTextValue] = useState('');

  const handleChange = (e: any) => {
    const parsedValue = parseInt(e.target?.value ?? '1');
    props.onChange(isFinite(parsedValue) ? parsedValue : 1);
    setPlainTextValue(e.target?.value ?? '');
  };

  const getFormattedValue = (): string | undefined => {
    if (isFocused) {
      return plainTextValue;
    }

    if (isFinite(props.value)) {
      return props.value!.toString();
    }

    return '1';
  };

  const handleFocus = () => {
    setIsFocused(true);
    setPlainTextValue(getFormattedValue() ?? '1');
  };

  return (
    <Box component='div' sx={{ display: 'flex', flexDirection: 'row' }}>
      <TextField
        variant='outlined'
        type='number'
        value={getFormattedValue() ?? ''}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onFocus={handleFocus}
        sx={{
          display: 'flex',
          flexGrow: 1,
          '& input::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
          },
        }}
        InputProps={{ style: { borderRadius: 0 } }}
      />
      <Box component='div' sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          onClick={() => props.onChange(props.value + 1)}
          component='div'
          sx={{
            backgroundColor: sharedColors.black,
            color: sharedColors.white,
            '&:hover': {
              backgroundColor: sharedColors.orange1,
            },
            cursor: 'pointer',
          }}
        >
          <KeyboardArrowUpIcon />
        </Box>
        <Box component='div' sx={{ display: 'flex', flexGrow: 1 }} />
        <Box
          onClick={() => props.onChange(Math.max(props.value - 1, 1))}
          component='div'
          sx={{
            backgroundColor: sharedColors.black,
            color: sharedColors.white,
            '&:hover': {
              backgroundColor: sharedColors.orange1,
            },
            cursor: 'pointer',
          }}
        >
          <KeyboardArrowDownIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default QuantityInput;
