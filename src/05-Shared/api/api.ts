import axios from "axios";
import { createToken } from "./createToken";

export const instance = axios.create({
  baseURL: "http://api.valantis.store:40000",
  headers: {
    "X-Auth": createToken(),
  },
  timeout: 10000,
});
