import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { Page404 } from 'pages';
import { ROUTES } from "global/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.FEED}>
          <div>Hello</div>
        </Route>
        <Route exact path="/">
          <Redirect to={ROUTES.FEED} />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
