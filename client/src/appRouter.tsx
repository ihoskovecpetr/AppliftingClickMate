import * as React from "react";
import { useState, useEffect } from "react";
import {
  Switch,
  Route,
  NavLink,
  Redirect,
  useHistory,
  BrowserRouter as Router,
} from "react-router-dom";

import * as server from "./lib/serverData";

import AppLayout from "./Components/Layout/AppLayout";
import MainPageContainer from "./Components/Pages/MainPage/MainPageContainer";
import TeamPageContainer from "./Components/Pages/TeamPage/TeamPageContainer";

const AppRouter: React.SFC<IAppProps> = (props) => {
  console.log("App Router location: ", props);

  useEffect(() => {
    server.getData();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AppLayout {...props}>
            <MainPageContainer />
          </AppLayout>
        </Route>
        <Route exact path="/:team">
          <AppLayout {...props}>
            <TeamPageContainer />
          </AppLayout>
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;

interface IAppProps {}
