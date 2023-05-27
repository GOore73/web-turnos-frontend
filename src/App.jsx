import React from 'react';
import { BrowserRouter } from 'react-router-dom';

//objetos con los atributos de cada Route
import { WebRouter, AdminRouter } from './router';
import { AuthProvider } from './contexts';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AdminRouter />
        {/* <WebRouter /> */}
      </BrowserRouter>
    </AuthProvider>
  );

  // const router = createBrowserRouter([webRouter, adminRouter]);
  // return <RouterProvider router={router} />;
}

export default App;
