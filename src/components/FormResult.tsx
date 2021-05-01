import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useState } from 'react';

interface FormResultProps {
  submit: (value: IRequestCurrency) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  field: {
    flexGrow: 1
  },
  btn: {
    marginLeft: theme.spacing(2)
  }
}))

const FormResult: React.FC<FormResultProps> = ({submit}) => {
  const classes = useStyles();
  const [value, setValue] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const currVal: string[] = value.trim().split(' ');

    submit({
      value: currVal[0].toUpperCase(),
      to: currVal[3].toUpperCase(),
      from: currVal[1].toUpperCase(),
      result: null
    });

    setValue('');
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    if (value.split(' ').length === 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete='off' onSubmit={submitHandler}>
      <TextField className={classes.field} id='outlined-basic' variant='outlined' placeholder="15 usd in uah" value={value} onChange={changeHandler} />
      <Button className={classes.btn} type="submit" variant="contained" color="primary" size="large" disabled={disabled}>Get result</Button>
    </form>
  );
};

export default FormResult;
