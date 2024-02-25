import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { typeCard, typeState } from "./type";

const initialState: typeState = {
  cardsIds: [],
  cards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setDataIds: (state, action: PayloadAction<string[]>) => {
      state.cardsIds = action.payload;
    },
    setDataCards: (state, action: PayloadAction<typeCard[]>) => {
      state.cards = action.payload;
    },
  },
});

export const { setDataIds, setDataCards } = cardsSlice.actions;
export default cardsSlice.reducer;
