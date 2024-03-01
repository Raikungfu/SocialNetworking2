import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logoAvt.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../hook/UserSlice";
import { RootState } from "../../hook/rootReducer";
import Button from "../Layout/Button";
import Dropdown from "../Layout/Dropdown";
import Img from "../Layout/Img";
import { Link, useNavigate } from "react-router-dom";
import GroupElement from "../Layout/GroupElement";

const HeaderRight: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const initialState = useSelector((state: RootState) => state.user.userState);
  const [state, setState] = useState<boolean>(initialState.state === "active");
  useEffect(() => {
    setState(initialState.state === "active");
  }, [initialState.state]);

  const handleLogout = () => {
    dispatch(logoutUser());
    nav("/login");
  };

  return state ? (
    <Dropdown
      className={
        "flex flex-row justify-end items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
      }
      variant={"drop-down"}
      id={""}
      children={[]}
      wrapDropdownListVariant={
        "flex flex-col z-50 py-2 px-2 right-5 top-14 right-0 text-base absolute list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      }
      navLinkAvt={
        <Img src={initialState.avt ? initialState.avt : logo} variant={"avt"} />
      }
      navLinkIcon={[
        {
          link: "profile",
          label: `${initialState.name ? initialState.name : "User"}`,
          icon: (
            <Img
              src={initialState.avt ? initialState.avt : logo}
              variant={"avt"}
            />
          ),
        },
        {
          label: "Logout",
          onClick: handleLogout,
        },
      ]}
      navHeaderClassName={
        "flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      }
    />
  ) : (
    <div>
      <GroupElement
        children={[
          <Link
            key={"log-btn"}
            to={`/login`}
            children={
              <Button
                id={"login-btn"}
                variant={"accept-link-button"}
                type={"button"}
                label="Login"
                className="dark:text-white text-xs md:text-lg sm:text-base py-2.5 px-1.5 sm:px-3 md:px-5"
              />
            }
            id={""}
            className="access-link"
          />,
          <Link
            key={"reg-btn"}
            to={"/register"}
            children={
              <Button
                id={"login-btn"}
                variant={"accept-link-button"}
                type={"button"}
                label="Register"
                className="dark:text-white text-xs md:text-lg sm:text-base py-2.5 px-1.5 sm:px-3 md:px-5"
              >
                Register
              </Button>
            }
            id={""}
            className={"access-link"}
          />,
        ]}
        variant={"flex flex-row justify-end font-medium gap-x-1.5 basis-[20%]"}
      ></GroupElement>
    </div>
  );
};

export default HeaderRight;
