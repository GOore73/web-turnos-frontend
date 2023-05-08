import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <h2>Se está usando el AdminLayout</h2>
      <Outlet />;
    </div>
  );
};

export { AdminLayout };
