import { createStore } from "redux";
import toggleFavorite from './Reducers/favoriteReducer';

const store = createStore(toggleFavorite);

export default store;
