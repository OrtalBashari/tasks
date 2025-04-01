import { Outlet } from 'react-router-dom';
import NavBar from '../compomemts/headers/NavBar';
import { useLocation } from 'react-router-dom';




export const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      {location.pathname === "/" && <NavBar />}
      <div className="mt-20 px-8">
        <Outlet />
      </div>
    </div>
  );
};


