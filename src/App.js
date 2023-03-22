import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { RootLayout } from './pages/RootLayout/RootLayout';
import { ErrPage } from './pages/ErrPage/ErrPage';
import {Templates} from './pages/Templates/Templates'
import { MyCVs } from './pages/MyCVs/MyCvs';
import { Profile } from './pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrPage />,
    children: [
      {path: '/', element: <Home/> },
      {path:'/login', element: <Login/>},
      {path:'/templates', element: <Templates/>},
      {path:'/myCVs', element: <MyCVs/>},
      {path:'/profile', element: <Profile/>},
  ]},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;