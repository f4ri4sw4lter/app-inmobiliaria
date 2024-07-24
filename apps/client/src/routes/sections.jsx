import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import MensajePage from '../pages/mensaje';
import RegistrosPage from '../pages/registros';
import ContratosPage from '../pages/contratos';

export const IndexPage = lazy(() => import('../pages/app'));
export const ClientePage = lazy(() => import('../pages/cliente'));
export const InmueblePage = lazy(() => import('../pages/inmueble'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const NotFoundPage = lazy(() => import('../pages/page-not-found'));
export const DocumentosPage = lazy(() => import('../pages/documentos'));

// ----------------------------------------------------------------------

export default function Router({User}) {
  const routes = useRoutes([
    {
      path: 'backoffice',
      element: (
        <DashboardLayout User={User}>
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
        { path: 'registros/:vista?', element: <RegistrosPage />},
        { path: 'contratos/:accion?/:id?', element: <ContratosPage />},
        { path: 'documentos:accion?/:id?', element: <DocumentosPage />},
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

  return routes;
}
