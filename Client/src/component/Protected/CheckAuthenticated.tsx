import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../hook/rootReducer";
import withAuth from "../../hoc/Authenticated";

const Protected: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.userState.state
  );
  return isAuthenticated === "inactive" ? <Navigate to="/login" /> : element;
};

const ProtectedWithAuth = withAuth(Protected);

export default ProtectedWithAuth;
