export const createToken = () => {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const md5 = require("md5");

  const password = `Valantis_${year}${month < 9 ? "0" + month : month}${day < 9 ? "0" + day : day}`;

  const token = md5(password);

  return token;
};
