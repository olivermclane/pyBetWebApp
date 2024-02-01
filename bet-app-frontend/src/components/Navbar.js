import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../services/protectRoutes'; // Adjust path if needed
import "../navbar.css"
import axios from 'axios';
import {useNavigate} from 'react-router-dom'; // Import useNavigate for routing


const Navbar = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const [user, setUser] = useState(localStorage.getItem('username'));
    const [balance, setBalance] = useState(localStorage.getItem('balance'));
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear local storage
        setIsLoggedIn(false); // Update AuthContext
        navigate('/login'); // Redirect to login page
    };

    const handleLogin = () => {
        navigate('/login'); // Redirect to login page
    };

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('username');
            const storedBalance = localStorage.getItem('balance');

            if (storedUser && storedBalance) {
                setUser(storedUser);
                setBalance(storedBalance);
            } else {
                // Handle cases where local storage data is missing
                console.error('User data not found in local storage');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, []);

    const refreshOdds = async () => {
        setIsRefreshing(true);
        try {
            const response = await axios.get('/bet/refresh'); // Adjust endpoint if needed
            // Handle successful response (e.g., update odds data in your app)
            console.log('Odds refreshed successfully:', response.data);
        } catch (error) {
            console.error('Error refreshing odds:', error);
            // Handle error (e.g., display an error message to the user)
        } finally {
            setIsRefreshing(false);
        }
    };

    return (
        <nav className="navbar">
            {isLoggedIn && (
                <div className="user-info">
                    <span>Welcome, {user}</span>
                    <span>Balance: {formatBalance(balance)}</span>
                </div>
            )}
            <button onClick={refreshOdds} disabled={isRefreshing}>
                {isRefreshing ? 'Refreshing...' : 'Refresh Odds'}
            </button>
            {isLoggedIn && (
                <button onClick={handleLogout}>Logout</button>

            )}
            {
                !isLoggedIn && (
                    <button onClick={handleLogin}>Login</button>
                )
            }
        </nav>
    )
        ;
};

const formatBalance = (balance) => {
    if (balance == undefined) {
        return 0
    }
    // Implement your formatting logic here
    return `$${balance}`;
};

export default Navbar;