import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import App from "./App";
import "./i18n";
import "./index.css";
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}

                <BrowserRouter>
                <App />
                </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);
