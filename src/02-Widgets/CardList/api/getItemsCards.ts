import { instance } from "05-Shared/api";
import { typeCard } from "../model/type";

export const getItemsCards = (ids: string[]) => {
  return new Promise<typeCard[]>((resolve, reject) => {
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
