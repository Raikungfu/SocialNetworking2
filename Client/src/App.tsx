import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./component/Layout/Button";
import Header from "./component/Header";
import { Route, Routes } from "react-router-dom";
import Page404 from "./page/Error/Page404";
import Login from "./page/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        {/* <Route index element={<Dashboard />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<h1>pppp</h1>} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
