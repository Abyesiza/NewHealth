import { configureStore, createSlice } from '@reduxjs/toolkit';

const globalStateSlice = createSlice({
  name: 'globalState',
  initialState: {
    sysValue: '',
  },
  reducers: {
    setSysValue: (state, action) => {
      state.sysValue = action.payload;
    },
  },
});

export const { setSysValue } = globalStateSlice.actions;

const Store = configureStore({
  reducer: {
    globalState: globalStateSlice.reducer,
  },
});

export default Store;
