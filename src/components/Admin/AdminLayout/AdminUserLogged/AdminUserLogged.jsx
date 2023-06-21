import { useAuth } from '../../../../hooks';
import { Header } from 'semantic-ui-react';

export const AdminUserLogged = () => {
  const { user } = useAuth();
  if (!user) {
    return <h6></h6>;
  }
  return (
    <h6 className='admin-layout__h6'>{`${user.firstname}, ${user.role}`}</h6>
  );
};
