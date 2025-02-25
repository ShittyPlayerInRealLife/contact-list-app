import { configureStore, Dispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootCombine, rootReducer } from "./store";

export const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => Dispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootCombine> = useSelector;
