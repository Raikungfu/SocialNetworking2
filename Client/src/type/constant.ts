export const API_BASE_URL: string = (() => {
  const mode: string = import.meta.env.VITE_MODE;
  const urls: Record<string, string> = {
    DEV: import.meta.env.VITE_DEV_API_URL,
    PROD1: import.meta.env.VITE_PROD1_API_URL,
    PROD2: import.meta.env.VITE_PROD2_API_URL,
  };

  return urls[mode];
})();

export const firebaseConfig = {
  apiKey: "AIzaSyDaZqRHMpQZNmXh4yQFtxT26obJpYABSEw",
  authDomain: "social-networking-8c187.firebaseapp.com",
  projectId: "social-networking-8c187",
  storageBucket: "social-networking-8c187.appspot.com",
  messagingSenderId: "702320201102",
  appId: "1:702320201102:web:c7600e6a46e6409101a8df",
  measurementId: "G-M8054GGQZX",
};

// export const configuration: RTCConfiguration = {
//   iceServers: [
//     {
//       urls: "stun:stun.relay.metered.ca:80",
//     },
//     {
//       urls: "turn:global.relay.metered.ca:80",
//       username: "b065ccdcce956621e3669e28",
//       credential: "IbFzixRned1OJTn5",
//     },
//     {
//       urls: "turn:global.relay.metered.ca:80?transport=tcp",
//       username: "b065ccdcce956621e3669e28",
//       credential: "IbFzixRned1OJTn5",
//     },
//     {
//       urls: "turn:global.relay.metered.ca:443",
//       username: "b065ccdcce956621e3669e28",
//       credential: "IbFzixRned1OJTn5",
//     },
//     {
//       urls: "turns:global.relay.metered.ca:443?transport=tcp",
//       username: "b065ccdcce956621e3669e28",
//       credential: "IbFzixRned1OJTn5",
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// export const configuration: RTCConfiguration = {
//   iceServers: [
//     { urls: "stun:stun.relay.metered.ca:80" },
//     {
//       urls: "turn:global.relay.metered.ca:80",
//       username: "4be13f8c832bf26e47032183",
//       credential: "vIAZTGWsF/apHqZU",
//     },
//     {
//       urls: "turn:global.relay.metered.ca:80?transport=tcp",
//       username: "4be13f8c832bf26e47032183",
//       credential: "vIAZTGWsF/apHqZU",
//     },
//     {
//       urls: "turn:global.relay.metered.ca:443",
//       username: "4be13f8c832bf26e47032183",
//       credential: "vIAZTGWsF/apHqZU",
//     },
//     {
//       urls: "turns:global.relay.metered.ca:443?transport=tcp",
//       username: "4be13f8c832bf26e47032183",
//       credential: "vIAZTGWsF/apHqZU",
//     },
//   ],
//   iceCandidatePoolSize: 250,
// };

export const configuration: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun01.sipphone.com" },
    { urls: "stun:stun.ekiga.net" },
    { urls: "stun:stun.fwdnet.net" },
    { urls: "stun:stun.ideasip.com" },
    { urls: "stun:stun.iptel.org" },
    { urls: "stun:stun.rixtelecom.se" },
    { urls: "stun:stun.schlund.de" },
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stunserver.org" },
    { urls: "stun:stun.softjoys.com" },
    { urls: "stun:stun.voiparound.com" },
    { urls: "stun:stun.voipbuster.com" },
    { urls: "stun:stun.voipstunt.com" },
    { urls: "stun:stun.voxgratia.org" },
    { urls: "stun:stun.xten.com" },
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:global.relay.metered.ca:80",
      username: "4be13f8c832bf26e47032183",
      credential: "vIAZTGWsF/apHqZU",
    },
  ],
  iceCandidatePoolSize: 250,
};
