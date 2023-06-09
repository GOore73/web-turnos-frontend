import React, { useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared';
import { UserForm, ListUsers } from '../../../components/Admin/Users';
import './Users.scss';

export const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false); //hook para llamar para recargar los datos, por ejemplo al crear un nuevo usuario.

  const onOpenCloseModal = () => {
    setShowModal((prevState) => !prevState);
  }; //prevState, estatus actual de la variable del estado

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: 'Usuarios activos',
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Usuarios inactivos',
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <div className='users-page__title'>
        <h4>Users</h4>
      </div>
      <div className='users-page'>
        <Button
          className='users-page__add'
          primary
          icon='plus'
          circular
          onClick={onOpenCloseModal}
        ></Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title='Crear nuevo usuario'
      >
        <UserForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
};
