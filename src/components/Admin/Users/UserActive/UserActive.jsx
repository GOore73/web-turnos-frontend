import { Confirm } from 'semantic-ui-react';
import { useAuth } from '../../../../hooks';
import { User } from '../../../../api';
export const UserActive = (props) => {
  const { open, content, onCancel, onReload, _id, isActive } = props;
  // const { _id, isActive, onCancel, onReload } = props;
  const userController = new User();
  const { accessToken } = useAuth();

  const onOk = async () => {
    try {
      await userController.userActive(accessToken, _id, !isActive); //le paso el estatus contrario al actual
      onReload();
      onCancel();
    } catch (error) {
      throw error;
    }
  };
  return (
    <Confirm
      open={open}
      content={content}
      onCancel={onCancel}
      onConfirm={onOk}
      cancelButton={'No'}
      confirmButton={isActive ? 'Desactivar' : 'Activar'}
    />
  );
};
