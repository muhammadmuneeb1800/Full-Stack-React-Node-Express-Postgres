import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./slices/TodoSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    todoSlice: TodoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
