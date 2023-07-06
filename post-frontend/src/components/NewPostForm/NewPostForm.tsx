import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { Theme } from '@mui/material/styles';
import FileUpload from "../UI/Form/FileUpload";
import FormElement from "../UI/Form/FormElement";

const useStyles = makeStyles<Theme>(theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    },
    root: {
        marginTop: theme.spacing(2)
    },
    form: {
        marginTop: theme.spacing(1),
    }
}));

interface Props {
    onSubmit: (product: FormData) => void;
}

interface NewsForm {
    title: string;
    description: string;
    image: string;
}

const NewPostForm = ({ onSubmit }: Props) => {
    const classes = useStyles();

    const [state, setState] = useState<NewsForm>({
        title: "",
        description: "",
        image: ""
    });
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state.description && !state.image) {
            setOpen(true)
        } else {
            setOpen(false)
            const formData = new FormData();
            for (let key in state) {
                formData.append(key, state[key as keyof typeof state])
            }
            onSubmit(formData);
        }
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        if (e.target.files) {
            const file = e.target.files[0];
            setState(prevState => ({
                ...prevState,
                [name]: file
            }))
        }
    }

    return (
        <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {'Необходимо заполнить текст поста или добавить картинку'}
                </Alert>
            </Snackbar>
            <Grid container direction="column" spacing={2} component='section' maxWidth='xs' marginLeft={1}>
                <Grid item xs marginTop={2}>
                    <Typography variant="h4">Добавить новый пост</Typography>
                </Grid>
                <Box className={classes.paper}>
                    <Box className={classes.form}>
                        <Grid container spacing={2} maxWidth='600px' marginLeft={0.2}>
                            <FormElement
                                required
                                value={state.title}
                                onChange={inputChangeHandler}
                                name='title'
                                label='Заголовок'
                            />
                            <Grid item xs>
                                <TextField
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    id="content"
                                    label="Текст"
                                    value={state.description}
                                    onChange={inputChangeHandler}
                                    name="description"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Grid item xs>
                    <FileUpload label="Картинка" name='image' onChange={fileChangeHandler}></FileUpload>
                </Grid>
                <Grid item xs>
                    <Button type="submit" variant="contained">Отправить</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewPostForm;
