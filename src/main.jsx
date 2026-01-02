import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter, RouterProvider } from "react-router-dom"

import { Store } from "./redux/Store"


import "./index.css"
import App from "./App"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
