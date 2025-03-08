import { Outlet } from 'react-router-dom';
import NavBar from '../compomemts/headers/NavBar';





export const MainLayout = () => {
  return (
    <div>
        <NavBar />
        <Outlet />  
    </div>
  );
};
