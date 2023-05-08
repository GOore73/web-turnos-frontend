import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ClientLayout } from '../layouts';
import { Blog, Contact, Courses, Home, Post } from '../pages/web/';

const WebRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<ClientLayout />}>
        {['/', '/home'].map((path) => (
          <Route key={path} path={path} element={<Home />} />
        ))}
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/blog/:path' element={<Post />} />
      </Route>
    </Routes>
  );
};

export { WebRouter };

/* formato con objetos */
// const webRouter = {
//   path: '/',
//   element: <ClientLayout />,
//   children: [
//     {
//       path: '/',
//       element: <Home />,
//     },
//   ],
// };

// export { webRouter };
