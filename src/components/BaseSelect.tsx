import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box } from '@material-ui/core';
import { useAppSelector } from '../store/hooks';
import { selectCurrency } from '../store/currencySlice';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 130,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const BaseSelect: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState<{
    currency: string;
    name: string;
  }>({
    currency: '',
    name: 'currency',
  });
  const currency = useAppSelector(selectCurrency);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

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
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel htmlFor='outlined-age-native-simple'>Currency</InputLabel>
        <Select
          native
          value={state.currency}
          onChange={handleChange}
          label='Currency'
          inputProps={{
            name: 'currency',
            id: 'currency',
          }}
        >
          <option value={currency.baseCurrency.id}>{currency.baseCurrency.name}</option>
          {renderOptions().map((el, key) => (
            <option value={el.currencyId} key={key}>
              {el.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BaseSelect;
