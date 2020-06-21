import { combineReducers } from 'redux';
import entityReducers from './entities';
import apiReduer from './api';

export default combineReducers({
  entities: entityReducers,
  api: apiReduer,
});
