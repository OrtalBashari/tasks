import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import { MainLayout } from '../layout/MainLayout.jsx';
import Home from '../pages/Home.jsx';
import Signup from '../pages/LogIn/Signup.jsx';
import SignIn from '../pages/LogIn/SignIn.jsx';
import Task from '../pages/Task/Task.jsx';
import Profile from '../pages/Profile/Profile.jsx';
import DailyPlanner from '../pages/Task/DailyPlanner.jsx';
import EisenhowerMatrix from '../pages/Task/EisenhowerMatrix.jsx';
import TaskCategories from '../pages/Task/TaskCategories.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
        {
            path: "/",
            element: <Home/> // Home as the main page of your site
        },
        {
            path: "Signup",
            element: <Signup />
        },
        {
          path: "SignIn",
          element: <SignIn />
        },
        {
            path: "Task",
            element: <Task />
        },
        {
          path: "Profile",
          element: <Profile />
        },
        {
          path: "daily-planner",
          element: <DailyPlanner />
        },
        {
          path: "eisenhower-matrix",
          element: <EisenhowerMatrix />
        },
        {
          path: "task-categories",
          element: <TaskCategories />
        }

    ]
  },
]);
