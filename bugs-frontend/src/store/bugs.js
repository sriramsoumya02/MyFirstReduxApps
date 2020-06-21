/*
//action types
const BUG_ADDED = 'bugAdded';
const BUG_REMOVED = 'bugRemoved';
const BUG_RESOLVED = 'bugResolved';

//action creators
export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description: description,
  },
});

export const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: {
    id: id,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id: id,
  },
});

//reducer
let lastId = 0;
export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case BUG_REMOVED:
      return state.filter((bug) => action.payload.id !== bug.id);
    case BUG_RESOLVED:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );
    default:
      return state;
  }
}

*/
/*
import { createAction, createReducer } from '@reduxjs/toolkit';

export const bugAdded = createAction('bugAdded');
export const bugRemoved = createAction('bugRemoved');
export const bugResolved = createAction('bugResolved');

let lastId = 0;
export default createReducer([], {
  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },
  [bugRemoved.type]: (bugs, action) => {
    bugs.filter((bug) => action.payload.id !== bug.id);
  },
  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex((bug) => action.payload.id === bug.id);
    bugs[index].resolved = true;
  },
});

*/

import { createSlice, createAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import moment from 'moment';
import { apiCallBegun } from './api';
//let lastId = 0;
const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    lastFetch: null,
  },
  reducers: {
    //actions=> action handler
    bugsRecieved: (bugs, action) => {
      bugs.list = action.payload;
      bugs.lastFetch = Date.now();
    },
    bugAdded: (bugs, action) => {
      // bugs.list.push({
      //   id: ++lastId,
      //   description: action.payload.description,
      //   resolved: false,
      // });
      bugs.list.push(action.payload);
    },
    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => action.payload.id !== bug.id);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => action.payload.id === bug.id);
      if (index >= 0) bugs.list[index] = action.payload;
      else bugs.list.push(action.payload);
    },
    bugAssigned: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => action.payload.id === bug.id);
      if (index >= 0) bugs.list[index].userId = action.payload.userId;
      else bugs.list.push(action.payload);
    },
  },
});
//console.log('slice', slice);
export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssigned,
  bugsRecieved,
} = slice.actions;
export default slice.reducer;
//action creators
const url = '/bugs';
export const loadBugs = () => (dispatch, getState) => {
  const lastFetch = getState().entities.bugs.lastFetch;
  console.log('lastFetch', lastFetch);
  const minutes = moment().diff(lastFetch, 'minutes');
  if (lastFetch == null || minutes > 9)
    return dispatch(
      apiCallBegun({
        url,
        onSucess: bugsRecieved.type,
      })
    );
};

export const addBugs = (bug) =>
  apiCallBegun({
    url,
    method: 'post',
    data: bug,
    onSucess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegun({
    url: url + '/' + id,
    method: 'patch',
    data: { resolved: true },
    onSucess: bugResolved.type,
  });

export const assignBug = (userId, id) =>
  apiCallBegun({
    url: url + '/' + id,
    method: 'patch',
    data: { userId: userId },
    onSucess: bugAssigned.type,
  });

//selector
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);
export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((bug) => bug.userId === userId)
  );
