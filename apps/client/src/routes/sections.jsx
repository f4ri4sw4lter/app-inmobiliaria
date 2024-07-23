import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import MensajePage from '../pages/mensaje';

export const IndexPage = lazy(() => import('../pages/app'));
export const ClientePage = lazy(() => import('../pages/cliente'));
export const InmueblePage = lazy(() => import('../pages/inmueble'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const FrontPage = lazy(() => import('../pages/front'));

// ----------------------------------------------------------------------

export default function Router({isLogged, setIsLogged}) {
  const routes = useRoutes([
    {
      path: 'backoffice',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'inmuebles/:accion?/:id?', element: <InmueblePage />},
        { path: 'users/:accion?/:id?', element: <UserPage /> },
        { path: 'clientes/:accion?/:id?', element: <ClientePage /> },
        { path: 'mensajes', element: <MensajePage />},
      ],
    },
    {
      path: '/',
      element: <FrontPage/>,
      children: [
        {path: '/propiedad/:propiedadId', element: <FrontPage/>}
      ]
    },
    {
      path: 'login',
      element: <LoginPage isLogged={isLogged} setIsLogged={setIsLogged}/>,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
