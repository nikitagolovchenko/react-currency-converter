import React from 'react'
import { Box, List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) => ({
  root: {

  }
}))

const CurrenciesList: React.FC<any> = ({currencies}) => {
  const classes = useStyles();

  const renderCurrencies = (): string[] => {
    let res: string[] = [];

    for (let key in currencies) {
      const arrId: string[] = key.split('_');
      res.push(`1 ${arrId[0]} = ${currencies[key]} ${arrId[1]}`);
    }

    return res;
  }

  return (
    <Box className={classes.root}>
      <List >
          {renderCurrencies().map((el, index) => (
            <ListItem button key={index}>
              <ListItemText primary={el}/>
            </ListItem>
          ))}  
      </List>
    </Box>
  )
}

export default CurrenciesList
