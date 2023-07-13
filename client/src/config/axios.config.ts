import axios from "axios";

const baseURL = "http://localhost:8000";

const privateAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    // Authentication: accessToken,
  },
});
privateAxios.interceptors.request.use((config: any) => {
  let getAccessToken = localStorage.getItem("accessToken");
  let accessToken = getAccessToken ? JSON.parse(getAccessToken) : null;
  return { ...config, headers: { Authentication: accessToken } };
});
export const privateAxiosUpload = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    // Authentication: accessToken,
  },
});
privateAxiosUpload.interceptors.request.use((config: any) => {
  let getAccessToken = localStorage.getItem("accessToken");
  let accessToken = getAccessToken ? JSON.parse(getAccessToken) : null;
  return { ...config, headers: { Authentication: accessToken } };
});
export default privateAxios;

// import React, { useEffect } from "react";

// export default function config() {
//   useEffect(()=>)
//   let hihi = "hihi";
//   return hihi;
// }
