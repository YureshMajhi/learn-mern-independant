import { useAuthContext } from "./UseAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // updating auth context
    dispatch({ type: "LOGOUT" });

    // clear user data
    localStorage.clear("user");
  };

  return { logout };
};
