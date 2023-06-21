import React from 'react';
import { Icon } from '../../assets';
import { AdminMenu, AdminUserLogged } from '../../components/Admin/AdminLayout';
import { Grid, Header } from 'semantic-ui-react';

import './AdminLayout.scss';

import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <Grid columns={2} stackable className='admin-layout'>
      <Grid.Column width={2} className='admin-layout__left'>
        {/* <Icon.LogoWhite className='logo' /> */}
        <h4 className='admin-layout__h4'>Truck APPointment</h4>
        <AdminMenu />
        <AdminUserLogged />
      </Grid.Column>
      <Grid.Column width={14}>
        <Outlet />
      </Grid.Column>
    </Grid>
    // <div className='admin-layout'>
    //   <div className='admin-layout__left'>
    //     <Icon.LogoWhite className='logo' />
    //     <h4>Truck APPointment</h4>
    //     <AdminMenu />
    //     <div className='logged'>
    //       <AdminUserLogged className='logged' />
    //     </div>
    //   </div>
    //   <div className='admin-layout__right'>
    //     <div className='admin-layout__right-content'>
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
  );
};

export { AdminLayout };
