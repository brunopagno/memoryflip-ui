import * as Service from "../services/authService";

export function useAuth() {
  const isLoggedIn = () => {
    return Service.isLoggedIn();
  };

  const register = async (email, password, passwordConfirmation) => {
    return await Service.register(email, password, passwordConfirmation);
  };

  const login = async (email, password) => {
    return await Service.login(email, password);
  };

  const logout = async () => {
    await Service.logout();
  };

  return {
    isLoggedIn,
    register,
    login,
    logout,
  };
}
