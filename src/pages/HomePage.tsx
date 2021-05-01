import { Typography } from '@material-ui/core';
import React from 'react';
import FormResult from '../components/FormResult';
import Layout from '../components/Layout';
import { getCurrency, selectCurrency } from '../store/currencySlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const HomePage: React.FC = () => {
  const currency = useAppSelector(selectCurrency);
  const dispatch = useAppDispatch();

  const searchHandler = (value: IRequestCurrency) => {
    dispatch(getCurrency(value));
  };

  return (
    <Layout>
      <FormResult submit={searchHandler} />
      {!currency.currency.result && <Typography>...</Typography>}
      {!isNaN(currency.currency.result as number) && currency.currency.result && (
        <Typography>
          {currency.currency.value} {currency.currency.from} ={' '}
          {currency.currency.result} {currency.currency.to}
        </Typography>
      )}
    </Layout>
  );
};

export default HomePage;
