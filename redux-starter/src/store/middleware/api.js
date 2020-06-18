import axios from 'axios';
import { apiCallSucess, apiCallFailed, apiCallBegun } from '../api';
const api = ({ dispatch, getState }) => (next) => async (action) => {
  if (action.type !== apiCallBegun.type) return next(action);
  next(action);
  const { url, method, data, onSucess, onError } = action.payload;
  try {
    const response = await axios.request({
      baseURL: 'http://localhost:9001/api',
      url,
      method,
      data,
    });
    dispatch(apiCallSucess(response.data));
    if (onSucess) dispatch({ type: onSucess, payload: response.data });
  } catch (err) {
    dispatch(apiCallFailed(err.message));
    if (onError) dispatch({ type: onError, payload: err.message });
  }
};

export default api;
