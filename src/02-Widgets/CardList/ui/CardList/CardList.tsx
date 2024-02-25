import { FC, useEffect, useState } from "react";

import "./style.css";
import { CardProduct } from "05-Shared/ui";
import { useAppDispatch, useAppSelector } from "00-App/store";
import { getIdsCards } from "../../api/getIdsCards";
import { setDataCards, setDataIds } from "../../model/cardsSlice";
import { getItemsCards } from "../../api/getItemsCards";
import { typeCard } from "../../model/type";

export const CardList: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cards = useAppSelector((state) => state.cards.cards);
  const dispath = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getIdsCards().then((res) => {
      dispath(setDataIds(res as string[]));

      getItemsCards(res as string[])
        .then((res) => {
          dispath(setDataCards(res as typeCard[]));
        })
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
