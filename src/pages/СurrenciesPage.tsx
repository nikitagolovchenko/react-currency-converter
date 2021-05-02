import React, { useEffect } from 'react'
import CurrenciesList from '../components/CurrenciesList';
import Layout from '../components/Layout'
import { getCurrencies, selectCurrency, setBaseCurrency } from '../store/currencySlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import BaseSelect from './../components/BaseSelect';

const СurrenciesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(selectCurrency);

  useEffect(() => {
    const request: Icurrencies = {
      base: currency.baseCurrency.id,
      currencies: currency.selectedCurrencies
    }

    dispatch(getCurrencies(request));
  }, [dispatch, currency.baseCurrency.id]);

  const changeCurrency = (curr: string): void => {
    dispatch(setBaseCurrency(curr));
  }

  return (
    <Layout>
      <BaseSelect changeBaseCur={changeCurrency}/>
      <CurrenciesList currencies={currency.currencies}/>
    </Layout>
  )
}

export default СurrenciesPage;
