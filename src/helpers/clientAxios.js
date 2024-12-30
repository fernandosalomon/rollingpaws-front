import axios from "axios";

const DEV_BASE_URL = `http://localhost:3001/api`;
const VERCEL_BASE_URL = "rollingpaws-back.vercel.app/api"

const clientAxios = axios.create({
  baseURL: VERCEL_BASE_URL,
});

export default clientAxios;
