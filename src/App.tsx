import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import СurrenciesPage from './pages/СurrenciesPage';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getCountries, selectCurrency } from './store/currencySlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(selectCurrency);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path='/' component={HomePage} exact />
          <Route path='/currencies' component={СurrenciesPage} exact />
          <Redirect to='/' />
        </Switch>
      </Router>
    </>
  );
};

export default App;
