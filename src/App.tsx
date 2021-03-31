import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import TablePage from "./Pages/TablePage/TablePage";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <TablePage />
      </div>
    </Provider>
  );
};

export default App;
