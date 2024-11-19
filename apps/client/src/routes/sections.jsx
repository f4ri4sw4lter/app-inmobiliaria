import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import MensajePage from '../pages/mensaje';
import RegistrosPage from '../pages/registros';
import ContratoPage from '../pages/contrato';
import { getUser } from '../utils/user';
import BackupPage from '../pages/backup';

export const IndexPage = lazy(() => import('../pages/app'));
export const ClientePage = lazy(() => import('../pages/cliente'));
export const InmueblePage = lazy(() => import('../pages/inmueble'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const NotFoundPage = lazy(() => import('../pages/page-not-found'));
export const DocumentosPage = lazy(() => import('../pages/documentos'));

// ----------------------------------------------------------------------

export default function Router({ setIsLogged}) {

  let routes = [];
  const User = getUser();

  if (User == '') {

    routes = useRoutes([
      { 
        path: '*', 
        element: <LoginPage setIsLogged={setIsLogged} /> 
      },
      { 
        path: 'login/:paso?', 
        element: <LoginPage setIsLogged={setIsLogged} /> 
      }

    ])

  } else {
    routes = useRoutes([
      {
        path: '/',
        element: <Navigate to="/backoffice" replace />,
      },
      {
        path: 'backoffice',
        element: (
          <DashboardLayout >
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        ),
        children: [
          { element: ((User.role <= 2) ? <IndexPage /> : <InmueblePage />), index: true },
          { path: 'inmuebles/:accion?/:id?', element: <InmueblePage /> },
          { path: 'users/:accion?/:id?', element: <UserPage /> },
          { path: 'clientes/:accion?/:id?', element: <ClientePage /> },
          { path: 'mensajes', element: <MensajePage /> },
          { path: 'registros/:vista?', element: <RegistrosPage /> },
          { path: 'documentos/:accion?/:id?', element: <DocumentosPage /> },
          { path: 'contratos/:accion?/:id?', element: <ContratoPage /> },
          { path: 'backup', element: <BackupPage /> },
        ],
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
  }



  return routes;
}
