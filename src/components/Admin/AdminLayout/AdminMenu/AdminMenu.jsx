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
  console.log(isLogged);

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
      <Dropdown item icon='wrench' simple>
        <Dropdown.Menu>
          {isAdmin && (
            <>
              <Dropdown.Item as={Link} to='/admin/users'>
                <Icon name='user outline' />
                Usuario
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/admin/menu'>
                <Icon name='bars' />
                Menu
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/admin/courses'>
                <Icon name='computer' />
                Cursos
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/admin/newsletter'>
                <Icon name='mail' />
                Newsletter
              </Dropdown.Item>
            </>
          )}

          <Dropdown.Item as={Link} to='/admin/blog'>
            <Icon name='comment alternate outline' />
            Blog
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
    // <Menu fluid vertical icon text className='admin-menu'>
    //   {isAdmin && (
    //     <>
    //       <Menu.Item
    //         as={Link}
    //         to='/admin/users'
    //         active={isCurrentPath('/admin/users')}
    //       >
    //         <Icon name='user outline' />
    //         Usuario
    //       </Menu.Item>
    //       <Menu.Item
    //         as={Link}
    //         to='/admin/menu'
    //         active={isCurrentPath('/admin/menu')}
    //       >
    //         <Icon name='bars' />
    //         Menu
    //       </Menu.Item>
    //       <Menu.Item
    //         as={Link}
    //         to='/admin/courses'
    //         active={isCurrentPath('/admin/courses')}
    //       >
    //         <Icon name='computer' />
    //         Cursos
    //       </Menu.Item>
    //       <Menu.Item
    //         as={Link}
    //         to='/admin/newsletter'
    //         active={isCurrentPath('/admin/newsletter')}
    //       >
    //         <Icon name='mail' />
    //         Newsletter
    //       </Menu.Item>
    //     </>
    //   )}

    //   <Menu.Item
    //     as={Link}
    //     to='/admin/blog'
    //     active={isCurrentPath('/admin/blog')}
    //   >
    //     <Icon name='comment alternate outline' />
    //     Blog
    //   </Menu.Item>
    // </Menu>
  );
};
