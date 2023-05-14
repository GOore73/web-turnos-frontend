import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Auth, Users, Blog, Courses, Menu, Newsletter } from '../pages/admin/';
import { AdminLayout } from '../layouts';
import { ProtectedRoute } from '../router';
import { useAuth } from '../hooks';

const AdminRouter = () => {
  // const user = null;
  // const user = { role: 'admin' };
  const { user } = useAuth();

  // const user = {
  //   id: 1,
  //   permissions: ['admin'],
  // }; //marca de usuario existente o no;
  // !!user es igual al condicional user? true : false

  return (
    <Routes>
      <Route path='/admin/' element={<AdminLayout />}>
        {/* Rutas no protegidas: */}
        <Route path='/admin/auth' element={<Auth />} />
        {/* Rutas protegidas, todas con la misma regla, por eso están dentro de un único ProtectedRoute: */}
        <Route
          element={
            // <ProtectedRoute isAllowed={!!user && user.role.includes('admin')} />
            <ProtectedRoute isAllowed={!!user} />
          }
        >
          {['/admin/', '/admin/blog'].map((path) => (
            <Route key={path} path={path} element={<Blog />} />
          ))}
          {/* Esto es cargar en un array todas las rutas que cargan el mismo elemento */}
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/courses' element={<Courses />} />
          <Route path='/admin/menu' element={<Menu />} />
          <Route path='/admin/newsletter' element={<Newsletter />} />
        </Route>
      </Route>
    </Routes>
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
