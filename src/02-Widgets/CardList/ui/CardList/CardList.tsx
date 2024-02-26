import { FC, useEffect, useState } from "react";

import "./style.css";
import { CardProduct } from "05-Shared/ui";
import { useAppDispatch, useAppSelector } from "00-App/store";
import { getIdsCards } from "../../api/getIdsCards";
import { setDataCards, setDataIds } from "../../model/cardsSlice";
import { getItemsCards } from "../../api/getItemsCards";
import { typeCard } from "../../model/type";
import { deleteDuplicateObj } from "../../lib/utils/deleteDuplicateObj";

export const CardList: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cards = useAppSelector((state) => state.cards.cards);
  const dispath = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    // Запрашиваем id карточек
    getIdsCards().then((res) => {
      dispath(setDataIds(res));

      // Запрашиваем по id карточек массив объектов карточек
      getItemsCards(res)
        .then((res) => {
          // Чистим массив от дупликатов
          const clearDuplicateArrObj: typeCard[] = deleteDuplicateObj(res);

          dispath(setDataCards(clearDuplicateArrObj));
        })
        // Снимаем загрузку
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, []);

  return isLoading ? (
    <span>Идет загрузка...</span>
  ) : (
    <ul className="card-list">
      {cards.length > 0 &&
        cards.map((card, index) => {
          return (
            <li className="card-item" key={index}>
              <CardProduct id={card.id} name={card.product} price={card.price} brand={card.brand} />
            </li>
          );
        })}
    </ul>
  );
};
