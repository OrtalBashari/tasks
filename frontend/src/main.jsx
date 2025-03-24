import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Aos from 'aos';
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from "./routes/router.jsx"; 



const queryClient = new QueryClient();

Aos.init();

createRoot(document.getElementById('root')).render(
  
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  
);
