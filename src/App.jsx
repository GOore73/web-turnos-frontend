import React from 'react';
import { BrowserRouter } from 'react-router-dom';

//objetos con los atributos de cada Route
import { WebRouter, AdminRouter } from './router';

function App() {
  return (
    <BrowserRouter>
      <AdminRouter />
      <WebRouter />
    </BrowserRouter>
  );

  // const router = createBrowserRouter([webRouter, adminRouter]);
  // return <RouterProvider router={router} />;
}

export default App;
