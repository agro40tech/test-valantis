import { FC, useEffect, useState } from "react";

import "./style.css";
import { CardProduct } from "05-Shared/ui";
import { useAppDispatch, useAppSelector } from "00-App/store";
import { getIdsCards } from "../../api/getIdsCards";
import { setDataCards, setDataIds } from "../../model/cardsSlice";
import { getItemsCards } from "../../api/getItemsCards";
import { typeCard } from "../../model/type";
import { deleteDuplicateObj } from "../../lib/utils/deleteDuplicateObj";
import { Filters } from "../Filters/Filters";
import { Pagination } from "../Pagination/Pagination";

export const CardList: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const idsRes = useAppSelector((state) => state.cards.cardsIds);
  const cards = useAppSelector((state) => state.cards.cards);
  const dispath = useAppDispatch();

  // Запрос ids карточек
  useEffect(() => {
    setIsLoading(true);

    getIdsCards(offset)
      // Получили ответ
      .then((res) => {
        dispath(setDataIds(res));
      })
      // Если не получили делаем новый запрос
      .catch((err) => {
        console.log(err);
        console.log("Повторный запрос id карточек");

        getIdsCards(offset)
          // Получили ответ
          .then((res) => {
            dispath(setDataIds(res));
          })
          // Если не получили сбрасываем ошибку
          .catch((err) => {
            console.log(err);
          });
      });
  }, [offset]);

  // Запрос карточек
  useEffect(() => {
    // Проверяем получили ли id карточек
    if (idsRes.length > 0) {
      setIsLoading(true);

      getItemsCards(idsRes)
        // Получили ответ
        .then((res) => {
          // Чистим массив от дупликатов
          const clearDuplicateArrObj: typeCard[] = deleteDuplicateObj(res);

          dispath(setDataCards(clearDuplicateArrObj));
        })
        // Если не получили делаем новый запрос
        .catch((err) => {
          console.log(err);
          console.log("Повторный запрос карточек");

          getItemsCards(idsRes)
            // Получили ответ
            .then((res) => {
              // Чистим массив от дупликатов
              const clearDuplicateArrObj: typeCard[] = deleteDuplicateObj(res);

              dispath(setDataCards(clearDuplicateArrObj));
            })
            // Если не получили сбрасываем ошибку
            .catch((err) => {
              console.log(err);
            })
            // Завершаем загрузку
            .finally(() => {
              setIsLoading(false);
            });
        })
        // Завершаем загрузку
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [idsRes]);

  return (
    <>
      {isLoading ? (
        <span>идет загрузка...</span>
      ) : (
        <>
          <Filters offset={offset} />
          <Pagination offset={offset} setOffset={setOffset} />
          <ul className="card-list">
            {cards.length > 0 &&
              cards.map((card, index) => {
                return (
                  <li className="card-item" key={index}>
                    <CardProduct
                      id={card.id}
                      name={card.product}
                      price={card.price}
                      brand={card.brand}
                    />
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </>
  );
};
