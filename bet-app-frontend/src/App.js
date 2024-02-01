import './App.css';
import './index.css';
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import {AuthProvider, P} from './services/protectRoutes';
import SportList from "./components/SportList"; // Import the PrivateRoute component
import Navbar from './components/Navbar';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Navigate to="/login" replace/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/sports" element={
                        <>
                            <Navbar/>
                            <SportList/>
                        </>
                    }/>

                </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}

export default App;