import axios from "axios"

export const fetchCountries = async () => {
  const data = await axios.get(`${process.env.REACT_APP_API_URL}countries?apiKey=${process.env.REACT_APP_API_KEY}`);
  return data;
}

export const fetchCurrency = async (value: IRequestCurrency) => {
  const data = await axios.get(`${process.env.REACT_APP_API_URL}convert?q=${value.from}_${value.to}&compact=ultra&apiKey=${process.env.REACT_APP_API_KEY}`);
  return data;
}

export const fetchCurrencies = async (value: Icurrencies) => {
  const request: string = value.currencies.map(item => `${item}_${value.base}`).join(',').trim();
  
  const data = await axios.get(`${process.env.REACT_APP_API_URL}convert?q=${request}&compact=ultra&apiKey=${process.env.REACT_APP_API_KEY}`);
  return data;
}