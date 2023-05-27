import { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { useAuth } from '../../../../hooks';
import { User } from '../../../../api';
import { UserItem } from '../UserItem';
const userController = new User();

export const ListUsers = (props) => {
  const { usersActive, reload } = props;
  const [users, setUsers] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setUsers(null); //esto hará que se renderize el componente y aparecerá el loader por unos instantes

        const response = await userController.getUsers(
          accessToken,
          usersActive
        );
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [usersActive, reload]);

  if (!users) return <Loader active inline='centered' />;
  if (size(users) === 0) return 'No hay ningún usuario';

  return map(users, (user) => <UserItem key={user._id} user={user} />);
};
