import "./App.css";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Page404 from "./page/Error/Page404";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Dashboard from "./page/Dashboard/Dashboard";
import Community from "./page/Community/Community";
import About from "./page/About/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Dashboard />} />
        <Route path="community" element={<Community />} />
        {/* <Route index element={<Protected element={<Dashboard />} />} />
        <Route
          path="community"
          element={<Protected element={<Community />} />}
        /> */}
        <Route path="about" element={<About />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
