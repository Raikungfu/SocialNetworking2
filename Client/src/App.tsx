import "./App.css";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Page404 from "./page/Error/Page404";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Dashboard from "./page/Dashboard/Dashboard";
import Community from "./page/Community/Community";
import About from "./page/About/About";
import ProtectedWithAuth from "./component/Protected/CheckAuthenticated";
import Profile from "./page/Profile/Profile";
import Meeting from "./page/Meeting/Meeting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        {/* <Route index element={<Dashboard />} />
        <Route path="community" element={<Community />} /> */}
        <Route index element={<ProtectedWithAuth element={<Dashboard />} />} />
        <Route
          path="community"
          element={<ProtectedWithAuth element={<Community />} />}
        />
        <Route path="about" element={<About />} />
        <Route
          path={`profile/:id`}
          element={<ProtectedWithAuth element={<Profile />} />}
        />
        <Route
          path={`meetings`}
          element={<ProtectedWithAuth element={<Meeting />} />}
        />
      </Route>
      <Route path="*" element={<Page404 />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
