// import { useEffect, useRef, useState } from "react";
// import Button from "../../component/Layout/Button";
// import StreamVideo from "../../component/Layout/StreamVideo";
// import Form from "../../component/Layout/Form/FormInputWithAttachFile";
// import { IndividualSendMessage } from "../../component/Layout/Form/FormInputWithAttachFile/types";
// import socket from "../../config/socketIO";
// import { peer, ICE } from "./type";

// const Meeting = () => {
//   const [videosStream, setVideosStream] = useState<JSX.Element[]>([]);
//   let localStream: MediaStream;
//   const [roomId, setRoomId] = useState<string>("");
//   let room: string = "";
//   const roomIdRef = useRef<HTMLSpanElement>(null);

//   const configuration: RTCConfiguration = {
//     iceServers: [
//       {
//         urls: "stun:stun.relay.metered.ca:80",
//       },
//       {
//         urls: "turn:global.relay.metered.ca:80",
//         username: "4be13f8c832bf26e47032183",
//         credential: "vIAZTGWsF/apHqZU",
//       },
//       {
//         urls: "turn:global.relay.metered.ca:80?transport=tcp",
//         username: "4be13f8c832bf26e47032183",
//         credential: "vIAZTGWsF/apHqZU",
//       },
//       {
//         urls: "turn:global.relay.metered.ca:443",
//         username: "4be13f8c832bf26e47032183",
//         credential: "vIAZTGWsF/apHqZU",
//       },
//       {
//         urls: "turns:global.relay.metered.ca:443?transport=tcp",
//         username: "4be13f8c832bf26e47032183",
//         credential: "vIAZTGWsF/apHqZU",
//       },
//     ],
//     iceCandidatePoolSize: 250,
//   };

//   const listPeerConnection: Array<peer> = [];

//   useEffect(() => {
//     if (roomIdRef.current) {
//       roomIdRef.current.textContent = "Current room: " + roomId;
//     }
//   }, [roomId]);

//   const init = async () => {
//     if (!localStream) {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       localStream = stream;
//       if (localStream) {
//         setVideosStream([
//           <StreamVideo
//             key={"localStream"}
//             id={"localStream"}
//             stream={localStream!}
//             room={room}
//           />,
//         ]);
//       }
//     }
//   };

//   const createRoom = async () => {
//     await init();
//     const peerConnection = new RTCPeerConnection(configuration);
//     const remoteStream = new MediaStream();
//     listPeerConnection.push({ rtcPeer: peerConnection, remoteStream });
//     try {
//       socket.emit("create:meeting", {}, async (_roomId: string) => {
//         setRoomId(_roomId);
//         await createOffer(_roomId, listPeerConnection.slice(-1)[0]);
//       });
//     } catch (error) {
//       console.error("Error creating room:", error);
//     }
//   };

//   const joinRoomById = async (room: IndividualSendMessage) => {
//     try {
//       await init();
//       socket.emit(
//         "join:meeting",
//         {
//           roomId: room.content,
//         },
//         async (roomRef: ICE) => {
//           const peerConnection = new RTCPeerConnection(configuration);
//           const remoteStream = new MediaStream();
//           listPeerConnection.push({ rtcPeer: peerConnection, remoteStream });
//           if (roomRef._roomId) {
//             setRoomId(roomRef._roomId);
//             await createAnswer(roomRef, listPeerConnection.slice(-1)[0]);
//           } else {
//             if (roomIdRef.current)
//               roomIdRef.current.textContent = "Not found!!!";
//           }
//         }
//       );
//     } catch (error) {
//       console.error("Error joining room:", error);
//     }
//   };

//   const createPeerConnection = async (peerConnection: peer, room: string) => {
//     // peerConnection = new RTCPeerConnection(configuration);

//     // remoteStream = new MediaStream();
//     setVideosStream((prev) => [
//       ...prev,
//       <StreamVideo
//         key={"remoteStream"}
//         id={"remoteStream"}
//         stream={peerConnection.remoteStream}
//         peerConnection={listPeerConnection.slice(-1)[0]}
//         room={room}
//       />,
//     ]);

//     localStream?.getTracks().forEach((track) => {
//       peerConnection.rtcPeer.addTrack(track, localStream);
//     });

//     peerConnection.rtcPeer.ontrack = (event) => {
//       event.streams[0].getTracks().forEach((track) => {
//         peerConnection.remoteStream.addTrack(track);
//       });
//     };

//     peerConnection.rtcPeer.onicecandidate = async (event) => {
//       if (event.candidate) {
//         socket.emit("ice:candidate", {
//           _roomId: room,
//           candidate: new RTCIceCandidate(event.candidate),
//         });
//       }
//     };

//     peerConnection.rtcPeer.addEventListener("icegatheringstatechange", () => {
//       console.log(
//         `ICE gathering state changed: ${peerConnection.rtcPeer.iceGatheringState}`
//       );
//       console.log(peerConnection);
//     });

//     peerConnection.rtcPeer.addEventListener("signalingstatechange", () => {
//       console.log(peerConnection.rtcPeer.signalingState);
//       console.log(peerConnection);
//     });

//     peerConnection.rtcPeer.addEventListener("connectionstatechange", () => {
//       console.log(
//         `Connection state change: ${peerConnection.rtcPeer.connectionState}`
//       );
//       console.log(peerConnection);
//     });

//     peerConnection.rtcPeer.addEventListener("iceconnectionstatechange ", () => {
//       console.log(
//         `ICE connection state change: ${peerConnection.rtcPeer.iceConnectionState}`
//       );
//       console.log(peerConnection);
//     });
//   };

//   const createOffer = async (id: string, peerConnection: peer) => {
//     room = id;
//     await createPeerConnection(peerConnection, id);
//     const offer = await peerConnection?.rtcPeer.createOffer();
//     await peerConnection?.rtcPeer.setLocalDescription(offer);
//     socket.emit("update:meeting", {
//       _roomId: id,
//       offer: offer,
//     });
//   };

//   const createAnswer = async (roomRef: ICE, peerConnection: peer) => {
//     room = roomRef._roomId;
//     await createPeerConnection(peerConnection, roomRef._roomId);
//     await peerConnection?.rtcPeer.setRemoteDescription(roomRef.offer);
//     const answer = await peerConnection?.rtcPeer.createAnswer();
//     await peerConnection?.rtcPeer.setLocalDescription(answer);
//     socket.emit("join:meetingSuccess", {
//       _roomId: roomRef._roomId,
//       offer: roomRef.offer,
//       answer: answer,
//     });
//     setRoomId(roomRef._roomId);
//   };

//   return (
//     <div className="p-20">
//       <div id="buttons" className="flex flex-row gap-5">
//         <Button
//           id="openCamera"
//           className="p-2 bg-red-500 text-white rounded-lg"
//           label="Create new Room"
//           onClick={createRoom}
//         />
//       </div>
//       <div>
//         <span id="currentRoom"></span>
//       </div>
//       <div id="videosStream" className="flex flex-row">
//         {videosStream.map((video) => video)}
//       </div>
//       <div className="fixed bottom-20 transform right-1/2 translate-x-1/2">
//         <span className="text-base text-red-500 m-4" ref={roomIdRef}></span>
//         <Form
//           formVariant=" items-center flex flex-row w-full"
//           inputVariant="px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
//           input={[
//             {
//               types: "text",
//               id: "content",
//               placeholder: "Search...",
//               wrapInputVariant: "pr-[2rem]",
//             },
//           ]}
//           id="chat-box"
//           buttonLabel="Enter RoomId"
//           buttonVariant="rounded-full text-white bg-red-600 text-base"
//           onSubmitSuccess={joinRoomById}
//           onSubmitFail={() => {}}
//         />
//       </div>
//     </div>
//   );
// };

// export default Meeting;
