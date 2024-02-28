import "./App.css";
import Header from "./component/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Page404 from "./page/Error/Page404";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Dashboard from "./page/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "./hook/rootReducer";

const Protected: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.userState.state
  );
  return isAuthenticated ? element : <Navigate to="/login" />;
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Protected element={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
