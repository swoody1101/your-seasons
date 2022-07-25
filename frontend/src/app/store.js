import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import LoginReducer from '../components/login/loginSlice'
import ModifyReducer from '../components/modify/modifySlice'
import UserReviewReducer from '../components/consultantmypage/userReviewSlice'
import consultantProfileReducer from '../components/consultantmypage/consultantProfileSlice'
import SignUpReducer from '../components/signup/signUpSlice'
import myConsultantDxSlice from "../components/mypage/myConsultantDxSlice";
import myReviewSlice from "../components/mypage/myReviewSlice";
import myResSlice from '../components/mypage/ReservationSlice';


const reducers = combineReducers({
  myConsultantDx: myConsultantDxSlice.reducer,
  myReviews: myReviewSlice.reducer,
  myRes: myResSlice.reducer,
  signup: SignUpReducer,
  login: LoginReducer,
  modify: ModifyReducer,
  review: UserReviewReducer,
  consultantprofile: consultantProfileReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
