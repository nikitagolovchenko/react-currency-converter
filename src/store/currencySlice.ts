import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCountries, fetchCurrency } from '../services/api';
import { RootState, AppThunk } from './store';
import { fetchCurrencies } from './../services/api';

export interface CurrencyState {
  countries: ICountries;
  loading: boolean;
  baseCurrency: {
    id: string;
  };
  currency: IRequestCurrency;
  currencies: string[];
  selectedCurrencies: string[];
  error: any;
}

const initialState: CurrencyState = {
  countries: {},
  loading: false,
  baseCurrency: {
    id: 'UAH'
  },
  currency: {
    value: '',
    to: '',
    from: '',
    result: null
  },
  currencies: [],
  selectedCurrencies: ['USD', 'EUR'],
  error: null
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

export const getCurrencies = createAsyncThunk(
  'currency/getCurrencies',
  async (value: Icurrencies) => {
    const response = await fetchCurrencies(value);

    return response.data;
  }
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,

  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency.id = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.error = null;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.currency = action.payload;
        state.error = null;
      })
      .addCase(getCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload;
        state.error = null;
      })
      .addCase(getCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const {setBaseCurrency} = currencySlice.actions;


export const selectCurrency = (state: RootState) => state.currency;

export default currencySlice.reducer;
