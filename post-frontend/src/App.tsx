import React from 'react';
import { Route, Routes } from "react-router-dom";
import { CssBaseline, Container } from '@mui/material';
import AppToolbar from '@/components/UI/Apptoolbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Posts from './containers/Posts/Posts';
import NewPost from './containers/NewPost/NewPost';
import { useAppSelector } from './hooks/reduxHooks';
import PostById from './containers/PostByid/PostById';


const App = () => {
    const { user } = useAppSelector(state => state.auth);
    return (
        <>
            <CssBaseline />
            <header>
                <AppToolbar />
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path='/' element={<Posts />}/>
                        <Route path='/posts/new' element={(
                            
                                <ProtectedRoute isAllowed={!!user} redirectPath='/'>
                                    <NewPost />
                                </ProtectedRoute>
                            
                        )} />

                        <Route path='/register' element={(
                           
                                <ProtectedRoute isAllowed={!user} redirectPath='/'>
                                    <Register />
                                </ProtectedRoute>
                            
                        )} />
                        <Route path='/login' element={(
                         
                                <ProtectedRoute isAllowed={!user} redirectPath='/'>
                                    <Login />
                                </ProtectedRoute>
                           
                        )} />
                        <Route path='/postById/:id' element={(
                              
                                <ProtectedRoute isAllowed={user} redirectPath='/'>
                                    <PostById/>
                                </ProtectedRoute>
                            
                        )} />
                    </Routes>
                </Container>
            </main>
        </>
    )
};

export default App;
