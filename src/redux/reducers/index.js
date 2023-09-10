import { combineReducers } from 'redux';
import auth from './auth'
import massages from './messages'

export const rootReducer = combineReducers({
  auth,
  massages,
});