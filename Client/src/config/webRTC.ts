// import { API_USER_CREATE_MEETING_ROOM } from "../service/Meeting/fetchMeeting";

// interface Meeting {
//   _id: string;
//   offer: {
//     type: string;
//     sdp: string;
//   };
// }

// const configuration = {
//   iceServers: [
//     {
//       urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// const peerConnection = new RTCPeerConnection(configuration);
// // let localStream = null;
// // let remoteStream = null;
// // let roomDialog = null;
// // let roomId = null;

// async function createRoom() {
//   console.log("Create PeerConnection with configuration: ", configuration);
//   registerPeerConnectionListeners();
//   const offer = await peerConnection.createOffer();
//   await peerConnection.setLocalDescription(offer);

//   const roomWithOffer = {
//     offer: {
//       type: offer.type,
//       sdp: offer.sdp,
//     },
//   };

//   const roomRef = (await API_USER_CREATE_MEETING_ROOM(
//     roomWithOffer
//   )) as unknown as Meeting;
//   const roomId = roomRef._id;

//   if (!peerConnection.currentRemoteDescription && roomRef) {
//     console.log("Set remote description: ", roomRef);
//   }

//   roomRef.onSnapshot(async (snapshot: unknown) => {
//     console.log(typeof snapshot);
//     console.log(snapshot);
//     // console.log("Got updated room:", snapshot.data());
//     // const data = snapshot.data();
//     // if (!peerConnection.currentRemoteDescription && data.answer) {
//     //   console.log("Set remote description: ", data.answer);
//     //   const answer = new RTCSessionDescription(data.answer);
//     //   await peerConnection.setRemoteDescription(answer);
//     // }
//   });

//   // localStream.getTracks().forEach((track) => {
//   //   peerConnection.addTrack(track, localStream);
//   // });

//   // Code for creating a room below

//   // Code for creating a room above

//   // Code for collecting ICE candidates below

//   // Code for collecting ICE candidates above

//   // peerConnection.addEventListener("track", (event) => {
//   //   console.log("Got remote track:", event.streams[0]);
//   //   event.streams[0].getTracks().forEach((track) => {
//   //     console.log("Add a track to the remoteStream:", track);
//   //     remoteStream.addTrack(track);
//   //   });
//   // });

//   // Listening for remote session description below

//   // Listening for remote session description above

//   // Listen for remote ICE candidates below

//   // Listen for remote ICE candidates above
// }

// // function joinRoom() {
// //   document.querySelector("#createBtn").disabled = true;
// //   document.querySelector("#joinBtn").disabled = true;

// //   document.querySelector("#confirmJoinBtn").addEventListener(
// //     "click",
// //     async () => {
// //       roomId = document.querySelector("#room-id").value;
// //       console.log("Join room: ", roomId);
// //       document.querySelector(
// //         "#currentRoom"
// //       ).innerText = `Current room is ${roomId} - You are the callee!`;
// //       await joinRoomById(roomId);
// //     },
// //     { once: true }
// //   );
// //   roomDialog.open();
// // }

// // async function joinRoomById(roomId) {
// //   const db = firebase.firestore();
// //   const roomRef = roomId;
// //   const roomSnapshot = await roomRef.get();
// //   console.log("Got room:", roomSnapshot.exists);

// //   if (roomSnapshot.exists) {
// //     console.log("Create PeerConnection with configuration: ", configuration);
// //     peerConnection = new RTCPeerConnection(configuration);
// //     registerPeerConnectionListeners();
// //     localStream.getTracks().forEach((track) => {
// //       peerConnection.addTrack(track, localStream);
// //     });

// // Code for collecting ICE candidates below

// // Code for collecting ICE candidates above

// // peerConnection.addEventListener("track", (event) => {
// //   console.log("Got remote track:", event.streams[0]);
// //   event.streams[0].getTracks().forEach((track) => {
// //     console.log("Add a track to the remoteStream:", track);
// //     remoteStream.addTrack(track);
// //   });
// // });

// // Code for creating SDP answer below

// // Code for creating SDP answer above

// // Listening for remote ICE candidates below

// // Listening for remote ICE candidates above
// //   }
// // }

// // async function openUserMedia(e) {
// //   const stream = await navigator.mediaDevices.getUserMedia({
// //     video: true,
// //     audio: true,
// //   });
// //   document.querySelector("#localVideo").srcObject = stream;
// //   localStream = stream;
// //   remoteStream = new MediaStream();
// //   document.querySelector("#remoteVideo").srcObject = remoteStream;

// //   console.log("Stream:", document.querySelector("#localVideo").srcObject);
// //   document.querySelector("#cameraBtn").disabled = true;
// //   document.querySelector("#joinBtn").disabled = false;
// //   document.querySelector("#createBtn").disabled = false;
// //   document.querySelector("#hangupBtn").disabled = false;
// // }

// // async function hangUp(e) {
// //   const tracks = document.querySelector("#localVideo").srcObject.getTracks();
// //   tracks.forEach((track) => {
// //     track.stop();
// //   });

// //   if (remoteStream) {
// //     remoteStream.getTracks().forEach((track) => track.stop());
// //   }

// //   if (peerConnection) {
// //     peerConnection.close();
// //   }

// //   document.querySelector("#localVideo").srcObject = null;
// //   document.querySelector("#remoteVideo").srcObject = null;
// //   document.querySelector("#cameraBtn").disabled = false;
// //   document.querySelector("#joinBtn").disabled = true;
// //   document.querySelector("#createBtn").disabled = true;
// //   document.querySelector("#hangupBtn").disabled = true;
// //   document.querySelector("#currentRoom").innerText = "";

// // Delete room on hangup
// // if (roomId) {
// // const db = firebase.firestore();
// // const roomRef = db.collection("rooms").doc(roomId);
// // const calleeCandidates = await roomRef.collection("calleeCandidates").get();
// // calleeCandidates.forEach(async (candidate) => {
// //   await candidate.delete();
// // });
// // const callerCandidates = await roomRef.collection("callerCandidates").get();
// // callerCandidates.forEach(async (candidate) => {
// //   await candidate.delete();
// // });
// // await roomRef.delete();
// //   }

// //   document.location.reload(true);
// // }

// function registerPeerConnectionListeners() {
//   peerConnection.addEventListener("icegatheringstatechange", () => {
//     console.log(
//       `ICE gathering state changed: ${peerConnection.iceGatheringState}`
//     );
//   });

//   peerConnection.addEventListener("connectionstatechange", () => {
//     console.log(`Connection state change: ${peerConnection.connectionState}`);
//   });

//   peerConnection.addEventListener("signalingstatechange", () => {
//     console.log(`Signaling state change: ${peerConnection.signalingState}`);
//   });

//   peerConnection.addEventListener("iceconnectionstatechange ", () => {
//     console.log(
//       `ICE connection state change: ${peerConnection.iceConnectionState}`
//     );
//   });
// }

// // init();
