import { CardList } from "02-Widgets/CardList";
import { FC } from "react";

export const HomePage: FC = () => {
  // const cardsIds: string[] = useAppSelector((state) => state.cards.cardsIds);

  // const dispath = useAppDispatch();

  // useEffect(() => {
  //   getIdsCards().then((res) => {
  //     dispath(setDataIds(res as string[]));
  //   });
  // }, []);

  return (
    <>
      <CardList />
    </>
  );
};
