import React from 'react';
import { Icon } from '../../assets';
import { AdminMenu } from '../../components/Admin/AdminLayout';
import './AdminLayout.scss';

import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      <div className='admin-layout__left'>
        <Icon.LogoWhite className='logo' />
        <AdminMenu />
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
