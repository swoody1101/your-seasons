import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
// auth
import AuthReducer from 'features/auth/authSlice'
// consulting
import ConsultReducer from 'features/consulting/consultingRoom/consultSlice'
import ConsultantListReducer from 'features/consulting/consultantListSlice'
// mypage
import MypageReducer from "features/mypage/mypageSlice";
// common
import AvatarReducer from "common/avatar/avatarSlice";
import ColorSetReducer from 'common/colorset/colorSetSlice'

const reducers = combineReducers({
  auth: AuthReducer,
  mypage: MypageReducer,
  consult: ConsultReducer,
  consultantList: ConsultantListReducer,
  avatar: AvatarReducer,
  colorSetList: ColorSetReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;