import { combineReducers } from 'redux';  
import {UserReducer} from './user';
import {CommonReducer} from './common';

export default  combineReducers({  
  userReducer: UserReducer,
  common: CommonReducer
});