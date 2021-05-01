import { Box, Container, CssBaseline, LinearProgress } from '@material-ui/core';
import React from 'react';
import { selectCurrency } from '../store/currencySlice';
import { useAppSelector } from '../store/hooks';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  const currency = useAppSelector(selectCurrency);

  return (
    <Box position='relative' width='100%' overflow='hidden'>
      <CssBaseline />
      {currency.loading && (
        <Box position='absolute' zIndex='100' top='0' left='0' width='100%'>
          <LinearProgress color='secondary' />
        </Box>
      )}

      <Header />
      <Box component='main' pt={3}>
        <Container maxWidth='md'>
          <>{children}</>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
