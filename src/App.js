import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { RootLayout } from './pages/RootLayout/RootLayout';
import { ErrPage } from './pages/ErrPage/ErrPage';
import {Templates} from './pages/Templates/Templates'
import { MyCVs } from './pages/MyCVs/MyCvs';
import { Profile } from './pages/Profile/Profile';
import { SignUp } from './pages/SignUp/SignUp';
import { Navigate } from 'react-router-dom';
import { CreateCv } from './pages/CreateCv/CreateCv';
import { ViewCv } from './components/ViewCv/ViewCv';
import { EditCv } from './components/EditCv/EditCv';
import { DownloadCv } from './components/Download/Download';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrPage />,
    children: [
      {path: '/', element:<Navigate to='/home' replace={true} />},
      {path: '/home', element: <Home/> },
      {path:'/login', element: <Login/>},
      {path:'/templates', element: <Templates/>},
      {path:'/myCVs', element: <MyCVs/>},
      {path:'/profile', element: <Profile/>},
      {path:'/signup', element: <SignUp/>},
      {path: '/create', element: <CreateCv/>},
      {path:'/view-cv', element: <ViewCv/>},
      {path:'/edit-cv', element: <EditCv/>},
      {path:'/download-cv', element: <DownloadCv/>}
  ]},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;