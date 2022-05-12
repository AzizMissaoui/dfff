import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import Switchreducer from './createreducer';

export const store = configureStore({
  reducer: {
    Switch: Switchreducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;