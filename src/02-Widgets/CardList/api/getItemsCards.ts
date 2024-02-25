import { instance } from "05-Shared/api";

export const getItemsCards = async (ids: string[]) => {
  return new Promise((resolve, reject) => {
    instance
      .post("/", {
        action: "get_items",
        params: { ids: ids },
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
