import { combineReducers } from 'redux';
import auth from './auth'
import messages from './messages'

export const rootReducer = combineReducers({
  auth,
  messages,
});