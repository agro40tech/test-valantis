import { instance } from "05-Shared/api";

export const getFields = () => {
  return new Promise<(string | null)[]>((resolve, reject) => {
    instance
      .post("/", {
        action: "get_fields",
        params: { field: "brand", offset: 0, limit: 50 },
      })
      .then((res) => {
        resolve(res.data.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
