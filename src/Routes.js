import React from "react";
import { BrowserRouter,Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";
import App from "./App"
import Cart from "./Cart"


const Routes = () => (
  <main>
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/cart" component={Cart} />
      <Redirect from="*" to="/app/page-not-found" />
    </Switch>
    </BrowserRouter>
  </main>
);

export default Routes;

