import { Confirm } from 'semantic-ui-react';
import { useAuth } from '../../../../hooks';
import { User } from '../../../../api';

export const UserDelete = (props) => {
  const { open, content, _id, onCancel, onReload } = props;
  const userController = new User();
  const { accessToken } = useAuth();

  const onOk = async () => {
    try {
      await userController.deleteUser(accessToken, _id);
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
      confirmButton={'Eliminar!'}
    />
  );
};
