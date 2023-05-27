import { useState, useEffect, createContext } from 'react';
import { User, Auth } from '../api';
import { hasExpiredToken } from '../utils';

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //función anónima autoejecutable, porque el login es una función async
    (async () => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();

      if (!accessToken || !refreshToken) {
        //el usuario no está logueado
        logout();
        setLoading(false);
        return;
      }

      if (hasExpiredToken(accessToken)) {
        // ha caducado el access
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      //comprobar tokens
      setLoading(false);
    })();
  }, []);

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshAccessToken(
        refreshToken
      );
      authController.setAccessToken(accessToken);
      await login(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (accessToken) => {
    try {
      const res = await userController.getMe(accessToken);
      delete res.result.password; //no guardo la password
      setUser(res.result);
      setToken(accessToken);
    } catch (error) {
      console.error('oops', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };

  if (loading) return null; //si ya está cargada la sesión.

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
