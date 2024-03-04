import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AxiosApi from "../config/axios";
import { RootState } from "../hook/rootReducer";
import { setState } from "../hook/UserSlice";

const withAuth = (
  WrappedComponent: React.ComponentType<{ element: React.JSX.Element }>
) => {
  const WithAuthComponent: React.FC<{ element: React.JSX.Element }> = (
    props
  ) => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const loc = useLocation();
    useEffect(() => {
      const checkLoginStatus = async () => {
        const response = await AxiosApi.get<RootState>("/", true);
        if (response.data) {
          dispatch(setState({ state: "active", ...response.data }));
        } else {
          console.error("Error:", response.error);
          nav("./login");
        }
      };
      checkLoginStatus();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loc.pathname]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
