import { FC, useEffect, useState } from "react";

import "./style.css";
import { getFields } from "../../api/getFields";
import { apiFilter } from "../../api/apiFilter";
import { useAppDispatch } from "00-App/store";
import { setDataIds } from "../../model/cardsSlice";

export const Filters: FC = () => {
  const [fields, setFields] = useState<(string | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("");

  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [product, setProduct] = useState<string>("");

  const dispath = useAppDispatch();

  // Запрос полей брендов
  useEffect(() => {
    getFields()
      // Получили ответ
      .then((res) => {
        setFields(res);
      })
      // Если не получили ответ делаем повторный запрос
      .catch((err) => {
        console.log(err);
        console.log("Повторный запрос полей брендов");

        getFields()
          // Получили ответ
          .then((res) => {
            setFields(res);
          })
          // Если не получили ответ сбрасываем ошибку
          .catch((err) => {
            console.log(err);
          });
      });
  }, []);

  const handleSubmit = () => {
    let filterObj = {};

    switch (activeFilter) {
      case "brand":
        filterObj = { brand: brand };
        break;
      case "product":
        filterObj = { product: product };
        break;
      case "price":
        filterObj = { price: Number(price) };
        break;
    }

    apiFilter(filterObj)
      // Получили ответ
      .then((res) => {
        dispath(setDataIds(res));
        console.log(res);
      })
      // Если не получили ответ делаем повторный запрос
      .catch((err) => {
        console.log(err);
        console.log("Повторный запрос фильтров");

        apiFilter(filterObj)
          // Получили ответ
          .then((res) => {
            dispath(setDataIds(res));
          })
          // Если не получили ответ сбрасываем ошибку
          .catch((err) => {
            console.log(err);
          });
      });
  };

  return (
    <form className="card__form">
      <fieldset className="form__fieldset">
        Бренды
        {fields.length > 0 &&
          fields.map((element, index) => {
            if (element !== null) {
              return (
                <label key={index}>
                  {element}
                  <input
                    type="radio"
                    value={element}
                    name="brand"
                    id={element}
                    onChange={(e) => {
                      setBrand(e.target.value);
                      setActiveFilter("brand");
                    }}
                  />
                </label>
              );
            } else {
              return null;
            }
          })}
      </fieldset>

      <fieldset>
        Цена
        <label>
          <input
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
              setActiveFilter("price");
            }}
          />
        </label>
      </fieldset>

      <fieldset>
        Название
        <label>
          <input
            type="text"
            onChange={(e) => {
              setProduct(e.target.value);
              setActiveFilter("product");
            }}
          />
        </label>
      </fieldset>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        Применить
      </button>
    </form>
  );
};
