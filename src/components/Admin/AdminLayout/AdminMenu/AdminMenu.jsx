import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks';
import './AdminMenu.scss';

export const AdminMenu = () => {
  const { pathname } = useLocation(); //objeto qde router que tiene un atributo pathname que tiene la parte de la url seleccionada

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user && user.role.includes('admin') ? true : false;
  const isLogged = !!user;

  const isCurrentPath = (path) => {
    if (path === pathname) {
      return true;
    }
    return false;
  };

  const onLogout = () => {
    logout();
    navigate('/admin/auth');
  };

  return (
    <Menu attached='top'>
      <Dropdown item icon='angle down' simple>
        <Dropdown.Menu>
          {isAdmin && (
            <>
              <Dropdown.Item as={Link} to='/admin/users'>
                <Icon name='user outline' />
                Usuarios
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/admin/centros'>
                <Icon name='warehouse' />
                Centros
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/admin/actividades'>
                <Icon name='edit outline' />
                Actividades
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/admin/calendarios'>
                <Icon name='calendar outline' />
                Calendarios
              </Dropdown.Item>
            </>
          )}
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to='/admin/turnos'>
            <Icon name='calendar check' />
            Turnos
          </Dropdown.Item>
          {isLogged ? (
            <Dropdown.Item onClick={onLogout}>
              <Icon name='sign-out' />
              Cerrar sesión
            </Dropdown.Item>
          ) : (
            <Dropdown.Item as={Link} to='/admin/auth'>
              <Icon name='sign-in' />
              Iniciar sesión
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};
