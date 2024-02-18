import React from 'react';
import BaseLayout from '../../layout/baselayout';
import Home from '../../pages/Home/Home';
import NotFound from '../../pages/NotFound/NotFound';
import Register from '../../pages/register/register';
import Login from '../../pages/login/login';
import Product from '../../pages/Product/Product';
// import Chat from '../../pages/messages/chat';
import Profile from '../../pages/profiles/profile';
import ForgotPassword from '../../pages/login/forgot';
import ConfirmPassword from '../../pages/login/confirmpassword';
// import Dashboard from '../../pages/Dashboard/dashboard';
import UserInfo from '../../pages/userinfo/userinfo';
import Maps from "../../pages/Maps/Maps"
import Scan from '../../pages/Scan/Scan';



const routesConfig = [
  {
    path: '/register',
    element: <Register />,
  },
  
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '', // Use an empty string for the root route
    element: <BaseLayout />,
    children: [
      {
        path: '/product/:product_id',
        element: <Product />,
      },
      {
        path: '/Home',
        element: <Home />,
      },

      {
        path:'/profile',
        index: true,
        element: <Profile />,
      },
      {
        path:'/analytics',
        index: true,
        element: <Maps/>,
      },
      {
        path:'/scan',
        index: true,
        element: <Scan/>,
      },
      {
        path:'/userinfo',
        index: true,
        element: <UserInfo />,
      }
    ],
  },
  {
    path:'forgotpassword',
    index:true,
    element:<ForgotPassword />,
  },
  {
    path:'resetpassword/:token',
    index:true,
    element:<ConfirmPassword />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routesConfig;
