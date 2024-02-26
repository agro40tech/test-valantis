import axios from "axios";
import { createToken } from "./createToken";

export const instance = axios.create({
  baseURL: "https://api.valantis.store:41000",
  headers: {
    "X-Auth": createToken(),
  },
  timeout: 10000,
});
