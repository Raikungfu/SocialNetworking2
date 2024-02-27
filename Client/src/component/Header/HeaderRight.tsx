import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../hook/UserSlice";
import { RootState } from "../../hook/rootReducer";
import GroupButton from "../Layout/GroupElement";
import Button from "../Layout/Button";
import LinkCmp from "../Layout/Link";
import Dropdown from "../Layout/Dropdown";
import Img from "../Layout/Img";

const HeaderRight: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const initialState = useSelector((state: RootState) => state.user.userState);
  const [state, setState] = useState<string>(initialState.state);
  useEffect(() => {
    setState(initialState.state);
  }, [initialState.state]);

  return state === "inactive" ? (
    <Dropdown
      className={"flex flex-row relative justify-end font-medium basis-[20%]"}
      variant={"drop-down"}
      id={""}
      children={[]}
      wrapDropdownListVariant={
        "z-50 my-4 text-base absolute list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      }
      navLinkAvt={{
        link: "profile",
        avtSrc: <Img src={initialState.avt} variant={"avt"} />,
        info: [
          {
            label: "Profile",
          },
          {
            label: "Profile",
          },
        ],
      }}
      navLinkIcon={[
        {
          link: "",
          label: "Profile",
        },
        {
          link: "/logout",
          label: "Logout",
          onClick() {
            dispatch(logoutUser());
            nav("/login");
          },
        },
      ]}
      navHeaderClassName={
        "flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      }
    />
  ) : (
    <div>
      <GroupButton
        children={[
          <LinkCmp
            key={"log-btn"}
            to={`/login`}
            children={
              <Button
                id={"login-btn"}
                variant={"accept-link-button"}
                type={"button"}
                label="Login"
              />
            }
            id={""}
            variant={"access-link"}
          />,
          <LinkCmp
            key={"reg-btn"}
            to={"/register"}
            children={
              <Button
                id={"login-btn"}
                variant={"accept-link-button"}
                type={"button"}
                label="Register"
              >
                Register
              </Button>
            }
            id={""}
            variant={"access-link"}
          />,
        ]}
        variant={"flex flex-row justify-end font-medium gap-x-1.5 basis-[20%]"}
      ></GroupButton>
    </div>
  );
};

export default HeaderRight;
