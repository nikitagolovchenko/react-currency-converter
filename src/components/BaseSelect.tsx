import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from '@material-ui/core/Select';
import { Box } from '@material-ui/core';
import { useAppSelector } from '../store/hooks';
import { selectCurrency } from '../store/currencySlice';

interface BaseSelectProps {
  changeBaseCur: (curr: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginBottom: theme.spacing(2),
      width: 130,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const BaseSelect: React.FC<BaseSelectProps> = ({ changeBaseCur }) => {
  const classes = useStyles();
  const currency = useAppSelector(selectCurrency);
  const [value, setValue] = React.useState<any | null>({
    currencyId: currency.baseCurrency.id
  });
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    if (value) {
      changeBaseCur(value.currencyId);
    }
  }, [value]);


  const renderOptions = () => {
    let arr: any[] = [];
    let obj: any = currency.countries as any;

    for (let key in obj) {
      arr.push({ ...obj[key], active: false });
    }

    return arr;
  };

  return (
    <Box display='flex' justifyContent='flex-end' mb={2}>
      <Autocomplete
        id='select-currency'
        options={renderOptions()}
        getOptionLabel={(option: any) => option.currencyId}
        style={{ width: 300 }}
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params: any) => (
          <TextField {...params} label='box' variant='outlined' />
        )}
      />
    </Box>
  );
};

export default BaseSelect;
