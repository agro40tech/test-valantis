import cardsSlice from "02-Widgets/CardList/model/cardsSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  cards: cardsSlice,
});
