import { createAction, createSlice } from '@reduxjs/toolkit';
// export const apiCallBegun = createAction('apiCallBegun');
// export const apiCallSucess = createAction('apiCallSucess');
// export const apiCallFailed = createAction('apiCallFailed');

const slice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
  },
  reducers: {
    apiCallBegun: (api, action) => {
      api.loading = true;
    },
    apiCallSucess: (api, action) => {
      api.loading = false;
    },
    apiCallFailed: (api, action) => {
      api.loading = false;
    },
  },
});
export default slice.reducer;
export const { apiCallBegun, apiCallSucess, apiCallFailed } = slice.actions;
