import { instance } from "05-Shared/api";

export const getIdsCards = () => {
  return new Promise<string[]>((resolve, reject) => {
    instance
      .post("/", {
        action: "get_ids",
        params: { offset: 0, limit: 10 },
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
