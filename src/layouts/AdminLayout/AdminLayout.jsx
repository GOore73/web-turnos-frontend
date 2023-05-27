import React from 'react';
import { Icon } from '../../assets';
import { AdminMenu, AdminUserLogged } from '../../components/Admin/AdminLayout';

import './AdminLayout.scss';

import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      <div className='admin-layout__left'>
        <Icon.LogoWhite className='logo' />
        <AdminMenu />
        <div className='logged'>
          <AdminUserLogged className='logged' />
        </div>
      </div>
      <div className='admin-layout__right'>
        <div className='admin-layout__right-content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { AdminLayout };
