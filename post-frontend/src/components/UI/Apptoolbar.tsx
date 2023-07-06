import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from "@mui/styles";
import { Typography, Toolbar, AppBar, Grid, Button } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useAppSelector } from '@/hooks/reduxHooks';
import UserMenu from './Menus/UserMenu';

const useStyles = makeStyles<Theme>(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    }
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  }
}));

const AppToolbar = () => {
  const classes = useStyles();
  const { user } = useAppSelector(state => state.auth);
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#4caf50' }}>
        <Toolbar>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant="h6">
              <Link to="/" className={classes.mainLink}>Форум-сообщество</Link>
            </Typography>
            {
              user ? (
                <Grid item>
                  <UserMenu user={user} />
                </Grid>
              ) : (
                <Grid item>
                  <Button color='inherit' component={Link} to='/register'>
                    Регистрация
                  </Button>
                  <Button color='inherit' component={Link} to='/login'>
                    Вход
                  </Button>
                </Grid>
              )
            }
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;