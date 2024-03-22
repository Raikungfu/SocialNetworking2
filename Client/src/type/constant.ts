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
