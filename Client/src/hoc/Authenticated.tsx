import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import AxiosApi from "../config/axios";
import { RootState } from "../hook/rootReducer";
import { setState } from "../hook/UserSlice";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent: React.FC = (props) => {
    const dispatch = useDispatch();
    const loc = useLocation();
    useEffect(() => {
      const checkLoginStatus = async () => {
        const response = await AxiosApi.get<RootState>("/", true);
        console.log("dsd" + response.data);
        if (response.data) {
          dispatch(setState({ state: "active", ...response.data }));
        } else {
          console.error("Error:", response.error);
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
