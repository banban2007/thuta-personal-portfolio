import { configureStore } from "@reduxjs/toolkit"
import menuReducer from "./slices/menuSlice"
import LoaderReducer from "./slices/loaderSlice"


export const Store = configureStore({
  reducer: {
    menu: menuReducer,
    loader: LoaderReducer,
  },
})
