import "./App.css";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Page404 from "./page/Error/Page404";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Dashboard from "./page/Dashboard/Dashboard";
import withAuth from "./hoc/Authenticated";
import { Protected } from "./component/Protected/CheckAuthenticated";

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

const AppWithAuth = withAuth(App);

export default AppWithAuth;
