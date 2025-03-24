import { Outlet } from 'react-router-dom';
import NavBar from '../compomemts/headers/NavBar';





export const MainLayout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="mt-20 px-8"> 
        <Outlet />  
      </div>
    </div>
  );
};

