import { useAuth } from '../../../../hooks';

export const AdminUserLogged = () => {
  const { user } = useAuth();
  if (!user) {
    return <h4></h4>;
  }
  return (
    <>
      <h6>{`${user.firstname}, ${user.role}`}</h6>
    </>
  );
};
