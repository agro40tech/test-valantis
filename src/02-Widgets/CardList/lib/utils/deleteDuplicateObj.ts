import { typeCard } from "../../model/type";

export const deleteDuplicateObj = (arr: typeCard[]) => {
  // Собираем массив id
  const idsArr: string[] = arr.map((element) => element.id);
  const clearIdsArr: string[] = [];
  const resultArr: typeCard[] = [];

  // Чистим массив от дупликатов Id
  idsArr.forEach((element, index) => {
    if (idsArr.indexOf(element) !== index) {
      return;
    }

    clearIdsArr.push(element);
  });

  // Собираем массив карточек по чистым Id
  let i = 0;
  arr.forEach((element) => {
    if (element.id === clearIdsArr[i]) {
      i++;
      resultArr.push(element);
    } else {
      return;
    }
  });

  return resultArr;
};
