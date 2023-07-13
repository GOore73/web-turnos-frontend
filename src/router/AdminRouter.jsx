import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Auth,
  Users,
  Actividades,
  Centros,
  Calendarios,
  Turnos,
  C404,
} from '../pages/admin/';
import { AdminLayout } from '../layouts';
import { ProtectedRoute } from '../router';
import { useAuth } from '../hooks';

const AdminRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/admin/turnos' />}></Route>
      <Route path='/admin/' element={<AdminLayout />}>
        {/* 1. Subrutas: */}
        {/* 1. 1 Subrutas no protegidas (admin, blog y cursos) */}
        {/* {['/admin/', 'turnos'].map((path) => (
          <Route key={path} path={path} element={<Turnos />} />
        ))} */}
        {/* 1. 2 Subrutas que requieren usuario logueado */}
        {!user && <Route path='/admin/*' element={<Auth />} />}
        {user && <Route path='/admin/turnos' element={<Turnos />} />}
        {/* 1. 3 Subrutas que requieren usuario logueado y con perfil admin  */}
        {user && user.role.includes('admin') && (
          <>
            <Route path='actividades' element={<Actividades />} />
            <Route path='auth' element={<Navigate to='/admin/turnos' />} />
            <Route path='users' element={<Users />} />
            <Route path='centros' element={<Centros />} />
            <Route path='calendarios' element={<Calendarios />} />
          </>
        )}
        {/* 1. 4 Subruta de admin no reconocida */}
        <Route path='*' element={<C404 />} />
      </Route>
    </Routes>

    // <Routes>
    //   <Route path='/admin/' element={<AdminLayout />}>
    //     {/* Rutas no protegidas: */}
    //     <Route path='/admin/auth' element={<Auth />} />
    //     {/* Rutas protegidas, todas con la misma regla, por eso están dentro de un único ProtectedRoute: */}
    //     <Route
    //       element={
    //         // <ProtectedRoute isAllowed={!!user && user.role.includes('admin')} />
    //         <ProtectedRoute isAllowed={!!user} />
    //       }
    //     >
    //       {['/admin/', '/admin/blog'].map((path) => (
    //         <Route key={path} path={path} element={<Blog />} />
    //       ))}
    //       {/* Esto es cargar en un array todas las rutas que cargan el mismo elemento */}
    //       <Route path='/admin/users' element={<Users />} />
    //       <Route path='/admin/courses' element={<Courses />} />
    //       <Route path='/admin/menu' element={<Menu />} />
    //       <Route path='/admin/newsletter' element={<Newsletter />} />
    //     </Route>
    //   </Route>
    // </Routes>
  );
};

export { AdminRouter };

// // objeto con los parámetros de la Route
// const adminRouter = {
//   path: '/admin/',
//   element: <AdminLayout />,
//   children: [
//     {
//       path: '/admin/',
//       element: <Auth />,
//     },
//     {
//       path: '/admin/users',
//       element: <Users />,
//     },
//   ],
// };

// export { adminRouter };
