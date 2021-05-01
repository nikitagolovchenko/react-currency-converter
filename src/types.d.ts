interface ICountries {
  [string]: {
    currencyId: string;
    id: string;
    name: string;
  }
}

interface IRequestCurrency {
  value: string;
  to: string;
  from: string;
  result: number | null;
}