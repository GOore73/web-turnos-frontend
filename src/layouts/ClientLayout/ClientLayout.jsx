import React from 'react';
import { Outlet } from 'react-router-dom';
const ClientLayout = () => {
  return (
    <div>
      <h2>Está cargando el ClientLayout</h2>
      <Outlet />
    </div>
  );
};

export { ClientLayout };
