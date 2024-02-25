export type typeCard = {
  brand: null | string;
  id: string;
  price: number;
  product: string;
};

export type typeState = {
  cardsIds: string[];
  cards: typeCard[];
};
