import { configureStore } from "@reduxjs/toolkit"
import menuReducer from "./slices/menuSlice"

export const Store = configureStore({
  reducer: {
    menu: menuReducer,
  },
})
