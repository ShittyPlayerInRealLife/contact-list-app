import React, { FC } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./state";
import { AppLayout } from "./app-layout";
import { ContactListService } from "./services";

const App: FC = () => (
  <Provider store={store}>
    <ContactListService>
      <AppLayout />
    </ContactListService>
  </Provider>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
