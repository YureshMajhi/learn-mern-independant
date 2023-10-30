import { useAuthContext } from "./UseAuthContext";
import { UseWorkoutsContext } from "./UseWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = UseWorkoutsContext();

  const logout = () => {
    // updating auth context
    dispatch({ type: "LOGOUT" });

    // clear user data
    localStorage.clear("user");

    // clearing global context
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
