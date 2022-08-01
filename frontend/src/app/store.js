import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
// common
import AvatarReducer from "common/avatar/avatarSlice";
import ColorSetReducer from 'common/colorset/colorSetSlice'
// auth
import LoginReducer from 'features/auth/loginSlice';
import SignUpReducer from 'features/auth/signUpSlice';
import ModifyReducer from 'features/auth/modifySlice';
// consulting
import ConsultantListReducer from 'features/consulting/consultantListSlice'
// mypage
import customerReducer from 'features/mypage/customerSlice';
import UserReviewReducer from 'features/mypage/userReviewSlice';
import consultantProfileReducer from 'features/mypage/consultantProfileSlice';

const reducers = combineReducers({
  signup: SignUpReducer,
  login: LoginReducer,
  modify: ModifyReducer,
  avatar: AvatarReducer,
  review: UserReviewReducer,
  customerMyPage: customerReducer,
  consultantprofile: consultantProfileReducer,
  consultantList: ConsultantListReducer,
  colorSetList: ColorSetReducer,
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