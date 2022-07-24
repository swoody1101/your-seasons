import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import SignUpReducer from '../components/signup/signUpSlice'
import LoginReducer from '../components/login/loginSlice'
import ModifyReducer from '../components/mypage/modify/modifySlice'

const reducers = combineReducers({
  signup: SignUpReducer,
  login: LoginReducer,
  modify: ModifyReducer,
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
