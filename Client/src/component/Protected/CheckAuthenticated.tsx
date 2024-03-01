import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../hook/rootReducer";

export const Protected: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.userState.state
  );
  console.log(isAuthenticated);
  return isAuthenticated === "inactive" ? <Navigate to="/login" /> : element;
};
