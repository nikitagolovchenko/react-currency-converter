import { AppBar, Button, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    marginRight: 'auto'
  }
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.logo}>
          Rect currency converter app
        </Typography>
        {location.pathname === '/currencies' && <Button component={NavLink} to="/" color='inherit'>Back home</Button>}
        {location.pathname === '/' &&  <Button component={NavLink} to="/currencies" color='inherit'>Currencies list</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
