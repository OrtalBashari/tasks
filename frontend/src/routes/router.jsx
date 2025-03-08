import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import { MainLayout } from '../layout/MainLayout.jsx';
import Home from '../pages/Home.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
        {
            path: '/',
            element: <Home/>
        }
    ]
  },
]);
