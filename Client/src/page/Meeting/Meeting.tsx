import { useEffect, useRef, useState } from "react";
import Button from "../../component/Layout/Button";
import Form from "../../component/Layout/Form/FormInputWithAttachFile";
import { IndividualSendMessage } from "../../component/Layout/Form/FormInputWithAttachFile/types";
import socket from "../../config/socketIO";
import ListStreamVideo from "../../component/Layout/StreamVideo";

export interface ICE {
  _roomId: string;
  _userId: string;
  offer: {
    type: RTCSdpType;
    sdp: string;
  };
  answer: {
    type: RTCSdpType;
    sdp: string;
  };
}

export interface peerC {
  _userId?: string;
  _roomId?: string;
  peerConnection: RTCPeerConnection;
}

const Meeting = () => {
  let localMediaStream: MediaStream;
  const [roomId, setRoomId] = useState<string>("");
  const roomIdRef = useRef<HTMLSpanElement>(null);
  const [listStreamVideo, setListStreamVideo] = useState<JSX.Element>();
  const init = async () => {
    if (!localMediaStream) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localMediaStream = stream;
      setListStreamVideo(
        <ListStreamVideo
          key={"localStream"}
          idKey={"localStream"}
          userId={"localStream"}
          localMediaStream={localMediaStream}
        />
      );
    }
  };

  useEffect(() => {
    if (roomIdRef.current) {
      roomIdRef.current.style.display = "color:green";
      roomIdRef.current.textContent = "Current room: " + roomId;
    }
  }, [roomId]);

  const createRoom = async () => {
    await init();
    try {
      socket.emit(
        "create:meeting",
        {},
        async (data: { _roomId: string; _userId: string }) => {
          setRoomId(data._roomId);
        }
      );
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoomById = async (room: IndividualSendMessage) => {
    try {
      await init();
      socket.emit(
        "join:meeting",
        {
          _roomId: room.content,
        },
        async (roomRef: ICE) => {
          if (roomRef._roomId) {
            setRoomId(roomRef._roomId);
          } else {
            if (roomIdRef.current)
              roomIdRef.current.textContent = "Not found!!!";
          }
        }
      );
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  return (
    <div className="p-20">
      <div
        id="videosStream"
        className="flex flex-row w-10/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed bg-red-50 h-5/6"
      >
        <Button
          id="openCamera"
          className="absolute p-2 bg-red-500 z-50 text-white rounded-lg"
          label="Create new Room"
          onClick={createRoom}
        />
        <div>{listStreamVideo}</div>
      </div>
      <div className="fixed bottom-20 transform right-1/2 translate-x-1/2">
        <span className="text-base text-red-500 m-4" ref={roomIdRef}></span>
        <Form
          formVariant=" items-center flex flex-row w-full"
          inputVariant="px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          input={[
            {
              types: "text",
              id: "content",
              placeholder: "Search...",
              wrapInputVariant: "pr-[2rem]",
            },
          ]}
          id="chat-box"
          buttonLabel="Enter RoomId"
          buttonVariant="rounded-full text-white bg-red-600 text-base"
          onSubmitSuccess={joinRoomById}
          onSubmitFail={() => {}}
        />
      </div>
    </div>
  );
};

export default Meeting;
