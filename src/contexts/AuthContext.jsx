import { useState, useEffect, createContext } from 'react';
import { User, Auth } from '../api';

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
      await login(accessToken);
      setLoading(false);
    })();
  }, []);

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

  const data = {
    accessToken: token,
    user,
    login,
  };

  if (loading) return null; //si ya está cargada la sesión.

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
