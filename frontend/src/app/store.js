import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import LoginReducer from '../components/login/loginSlice'
import ModifyReducer from '../components/modify/modifySlice'
import AvatarReducer from "../components/avatar/avatarSlice";
import UserReviewReducer from '../components/consultantmypage/userReviewSlice'
import consultantProfileReducer from '../components/consultantmypage/consultantProfileSlice'
import SignUpReducer from '../components/signup/signUpSlice'
import myConsultantDxReducer from "../components/mypage/myConsultantDxSlice";
import myReviewReducer from "../components/mypage/myReviewSlice";
import myResReducer from '../components/mypage/myResSlice';


const reducers = combineReducers({
  myConsultantDx: myConsultantDxReducer,
  myReviews: myReviewReducer,
  myRes: myResReducer,
  signup: SignUpReducer,
  login: LoginReducer,
  modify: ModifyReducer,
  avatar: AvatarReducer,
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
