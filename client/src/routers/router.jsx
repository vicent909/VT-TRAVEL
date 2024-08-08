import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout';
import HomePage from '../pages/HomePage';
import AllTravelPage from '../pages/AllTravelPage';
import TravelDetail from '../pages/TravelDetail';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import UserProfile from '../pages/UserProfile';

const router = createBrowserRouter([
    {
        element: <UserLayout />,
        path: '/',
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/all-travel',
                element: <AllTravelPage />
            },
            {
                path: '/detail/:id',
                element: <TravelDetail />
            },
        ]
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/user-profile',
        element: <UserProfile/>
    },
    
])

export default router;
