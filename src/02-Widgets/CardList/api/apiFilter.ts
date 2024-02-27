import { instance } from "05-Shared/api";

type typeParams = {
  product?: string;
  brand?: string;
  price?: number;
};

export const apiFilter = (params: typeParams) => {
  return new Promise<string[]>((resolve, reject) => {
    instance
      .post("/", {
        action: "filter",
        params: params,
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
