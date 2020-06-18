import { combineReducers } from 'redux';
import bugReducer from './bugs';
import projectReducer from './project';
import userReducer from './users';

export default combineReducers({
  bugs: bugReducer,
  projects: projectReducer,
  users: userReducer,
});
