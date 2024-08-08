import React from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout';
import HomePage from '../pages/HomePage';
import AllTravelPage from '../pages/AllTravelPage';
import TravelDetail from '../pages/TravelDetail';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import UserProfile from '../pages/UserProfile';
import AdminHome from '../pages/Admin/AdminHome';
import AdminLayout from '../layouts/AdminLayout';
import AddTravelPage from '../pages/Admin/AddTravelPage';
import CategoriesPage from '../pages/CategoriesPage';
import TravelInfo from '../pages/Admin/TravelInfo';

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
        loader: () => {
            if(!localStorage.getItem('token')){
                return null
            } else {
                return redirect('/')
            }
        },
        element: <RegisterPage/>
    },
    {
        path: '/login',
        loader: () => {
            if(!localStorage.getItem('token')){
                return null
            } else {
                return redirect('/')
            }
        },
        element: <LoginPage/>
    },
    {
        path: '/user-profile',
        loader: () => {
            if(localStorage.getItem('token')){
                return null
            } else {
                return redirect('/login')
            }
        },
        element: <UserProfile/>
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        loader: () => {
            if(localStorage.getItem('token') && localStorage.getItem('role') === 'Admin'){
                return null
            } else {
                return redirect('/')
            }
        },
        children: [
            {
                index: true,
                element: <AdminHome/>
            },
            {
                path: '/admin/add-travel',
                element: <AddTravelPage/>
            },
            {
                path: '/admin/edit-travel/:id',
                element: <AddTravelPage/>
            },
            {
                path: '/admin/categories',
                element: <CategoriesPage/>
            },
            {
                path: '/admin/travel/:id/info',
                element: <TravelInfo/>
            },
        ]
    },
    
])

export default router;
