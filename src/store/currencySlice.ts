import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCountries, fetchCurrency } from '../services/api';
import { RootState, AppThunk } from './store';

export interface CurrencyState {
  countries: ICountries;
  loading: boolean;
  baseCurrency: {
    id: string;
    name: string;
  };
  currency: IRequestCurrency;
}

const initialState: CurrencyState = {
  countries: {},
  loading: false,
  baseCurrency: {
    id: 'UAH',
    name: 'Ukraine'
  },
  currency: {
    value: '',
    to: '',
    from: '',
    result: null
  }
};

export const getCountries = createAsyncThunk(
  'currency/getCountries',
  async () => {
    const response = await fetchCountries();
    return response.data.results;
  }
);

export const getCurrency = createAsyncThunk(
  'currency/getCurrency',
  async (value: IRequestCurrency) => {
    const response = await fetchCurrency(value);

    return {
      value: value.value,
      result: +value.value * response.data[`${value.from}_${value.to}`],
      from: value.from,
      to: value.to
    };
  }
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(getCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.currency = action.payload;
      })
  },
});

export const {} = currencySlice.actions;


export const selectCurrency = (state: RootState) => state.currency;

export default currencySlice.reducer;
