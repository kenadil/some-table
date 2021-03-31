import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import TablePage from "./Pages/TablePage/TablePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import StartPage from "./Pages/StartPage/StartPage";
import UserPage from "./Pages/UserPage/UserPage";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/users/:id" component={UserPage}/>
            <Route path="/users" component={TablePage}/>
            <Route path="/" component={StartPage}/>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
