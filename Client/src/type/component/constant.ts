export const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "prod"
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;
