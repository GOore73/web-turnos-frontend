import './UserItem.scss';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { useState } from 'react';
import { image } from '../../../../assets';
import { ENV } from '../../../../utils';
import { BasicModal } from '../../../Shared';
import { UserForm, UserActive, UserDelete } from '../../Users';

export const UserItem = (props) => {
  const { user, onReload } = props;

  const [showModal, setShowModal] = useState(false);
  const [showActive, setShowActive] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  //Texto de la ventan confirm para activar/desactivar o eliminar:
  const [contentConfirm, setContentConfirm] = useState('');

  //1. Manejo del actualizar
  const [titleModal, setTitleModal] = useState('');
  //Abre el modal cuando se hace click sobre actualizar y pasa el control al formulario de edición
  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`);
    onOpenCloseModal();
  };
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  //2. Manejo del activar/desactivar
  //Abre el componente activar, que tiene adentro un Confirm.
  const openActiveUser = () => {
    const content = user.active
      ? `¿Desactivar usuario ${user.email}?`
      : `¿Activar usuario ${user.email}?`;
    setContentConfirm(content);
    onOpenCloseActive();
  };
  const onOpenCloseActive = () => setShowActive((prevState) => !prevState);

  //3. Manejo del elminar
  //Abre componente elminar que tiene adentro un Confirm
  const openDeleteUser = () => {
    setContentConfirm(`¿Eliminar usuario ${user.email}, id: ${user._id}?`);
    onOpenCloseDelete();
  };
  const onOpenCloseDelete = () => setShowDelete((prevState) => !prevState);

  return (
    <>
      <div className='user-item'>
        <div className='user-item__info'>
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
          <div>
            <p>
              {user.firstname} {user.lastname}
            </p>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        </div>

        <div>
          <Button icon primary onClick={openUpdateUser}>
            <Icon name='pencil' />
          </Button>
          <Button
            icon
            color={user.active ? 'orange' : 'teal'}
            onClick={openActiveUser}
          >
            <Icon name={user.active ? 'ban' : 'check'} />
          </Button>
          <Button icon color='red' onClick={openDeleteUser}>
            <Icon name='trash' />
          </Button>
        </div>
      </div>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
      </BasicModal>

      <UserActive
        open={showActive}
        content={contentConfirm}
        onCancel={onOpenCloseActive}
        onReload={onReload}
        _id={user._id}
        isActive={user.active}
      />

      <UserDelete
        open={showDelete}
        content={contentConfirm}
        onCancel={onOpenCloseDelete}
        onReload={onReload}
        _id={user._id}
      />
    </>
  );
};
