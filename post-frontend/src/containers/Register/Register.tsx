import React, {ChangeEvent, FormEvent, useState} from 'react';
import {makeStyles} from "@mui/styles";
import { Theme } from '@mui/material/styles';
import {
  Container,
  Avatar,
  Typography,
  Grid,
  Button,
  Link,
  Box
} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import {UserForm} from '@/interfaces/UserForm';
import { useSignUpMutation } from '@/store/services/auth';
import { MongooseError } from '@/interfaces/errors/MongooseError';
import FormElement from '@/components/UI/Form/FormElement';

const useStyles = makeStyles<Theme>(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    background: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  }
}));

const Register = () => {
  const classes = useStyles();

  const [form, setForm] = useState<UserForm>({
    userName: '',
    password: ''
  })

  const [signUp, { error }] = useSignUpMutation();

  const navigate = useNavigate();

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prevState =>  ({
      ...prevState,
      [name]: value
    }));
  }

  const getFieldError = (field: string) => {
    try {
      return (error as MongooseError).data[field].message
    } catch {
      return undefined
    }
  }

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await signUp(form);
    if(!(data as {error: object}).error) {
      setForm({
        userName: '',
        password: ''
      })
      navigate('/');
    }
  }

  return (
    <Container component='section' maxWidth='xs'>
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined/>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Регистрация
        </Typography>
        <Box className={classes.form}>
          <form onSubmit={submitFormHandler}>
            <Grid container spacing={2}>
              <FormElement
                required
                value={form.userName}
                onChange={inputChangeHandler}
                name='userName'
                label='Имя пользователя'
                error={getFieldError('username')}
              />
              <FormElement
                required
                value={form.password}
                onChange={inputChangeHandler}
                type='password'
                name='password'
                label='Пароль'
                error={getFieldError('password')}
              />
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{marginTop: 3, marginBottom: 2}}
            >
              Зарегистрироваться
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to='/login'>
                  Уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;