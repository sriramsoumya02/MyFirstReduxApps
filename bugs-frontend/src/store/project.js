import { createSlice } from '@reduxjs/toolkit';
let lastProjectId = 0;
const slice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    projectAdded: (projects, action) => {
      projects.push({
        id: ++lastProjectId,
        name: action.payload.name,
      });
    },
  },
});
export const { projectAdded } = slice.actions;
export default slice.reducer;
