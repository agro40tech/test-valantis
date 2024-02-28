import { instance } from "05-Shared/api";

export const getIdsCards = (offset: number) => {
  return new Promise<string[]>((resolve, reject) => {
    instance
      .post("/", {
        action: "get_ids",
        params: { offset: offset, limit: 50 },
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
