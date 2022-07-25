import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import SignUpReducer from '../components/signup/signUpSlice'
import myConsultantDxSlice from "../components/mypage/myConsultantDxSlice";
import myReviewSlice from "../components/mypage/myReviewSlice";
import myResSlice from '../components/mypage/ReservationSlice';
const reducers = combineReducers({
  signup: SignUpReducer,
	myConsultantDx: myConsultantDxSlice.reducer,
	myReviews: myReviewSlice.reducer,
	myRes: myResSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
