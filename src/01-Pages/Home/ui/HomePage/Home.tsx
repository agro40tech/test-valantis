import { CardList } from "02-Widgets/CardList";
import { FC } from "react";

import "./style.css";

export const HomePage: FC = () => {
  return (
    <main className="main">
      <CardList />
    </main>
  );
};
