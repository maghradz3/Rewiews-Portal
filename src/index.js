import ReactDOM from "react-dom/client";
import { Suspense } from "react";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<div>Loading~~~</div>}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </Suspense>
);
