import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AxiosApi from "../config/axios";
import { RootState } from "../hook/rootReducer";
import { setState } from "../hook/UserSlice";
import { setRoomGroup, setRoomIndividual } from "../hook/ChatRoomSlice";
import { ListChatGroup, ListChatIndividual } from "../type/API/User";
import {
  API_USER_GET_LIST_GROUP,
  API_USER_GET_LIST_INDIVIDUAL,
} from "../service/Chat/chatIndivisual";

const withAuth = (
  WrappedComponent: React.ComponentType<{ element: React.JSX.Element }>
) => {
  const WithAuthComponent: React.FC<{ element: React.JSX.Element }> = (
    props
  ) => {
    const dispatch = useDispatch();
    const chatRoomIndividual = useSelector(
      (state: RootState) => state.chatRoom.chatRoomIndividual
    );
    const chatRoomGroup = useSelector(
      (state: RootState) => state.chatRoom.chatRoomGroup
    );
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

      if (Object.entries(chatRoomIndividual).length === 0) {
        const getRoomInvidual = async () => {
          const res = (await API_USER_GET_LIST_INDIVIDUAL(
            {}
          )) as unknown as ListChatIndividual;

          if (res.length > 0) {
            res.map((chatIndividual) => {
              dispatch(
                setRoomIndividual({
                  key: chatIndividual.recipient._id,
                  value: {
                    member: chatIndividual.recipient,
                    roomId: chatIndividual.chatRoomId._id,
                    lastMessage: chatIndividual.chatRoomId.lastMessage,
                    sender: chatIndividual.chatRoomId.sender,
                    timeStamp: chatIndividual.chatRoomId.timeStamp,
                  },
                })
              );
            });
          }
        };

        getRoomInvidual();
      }

      if (Object.entries(chatRoomGroup).length === 0) {
        const getRoomGroup = async () => {
          const res = (await API_USER_GET_LIST_GROUP(
            {}
          )) as unknown as ListChatGroup;
          if (res.length > 0) {
            res.map((chatGroup) => {
              dispatch(
                setRoomGroup({
                  key: chatGroup._id,
                  value: {
                    roomId: chatGroup._id,
                    avt: chatGroup.avt,
                    name: chatGroup.name,
                    lastMessage: chatGroup.lastMessage,
                    sender: chatGroup.sender,
                    timeStamp: chatGroup.timeStamp,
                    members: {},
                  },
                })
              );
            });
          }
        };
        getRoomGroup();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loc.pathname]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
