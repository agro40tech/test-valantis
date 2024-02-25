import { FC } from "react";

import "./style.css";

type typeProps = {
  id: string;
  name: string;
  price: number;
  brand: null | string;
};

export const CardProduct: FC<typeProps> = ({ id, name, price, brand }) => {
  return (
    <article className="article">
      <span className="article__id">id: {id}</span>
      <span className="article__name">name: {name}</span>
      <span className="article__price">price: {price}</span>
      {brand ? <span className="article__brand">brand: {brand}</span> : null}
    </article>
  );
};
