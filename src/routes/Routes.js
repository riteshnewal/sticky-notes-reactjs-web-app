import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* Add More Route if Project need more Routing */}
    </Switch>
  </BrowserRouter>
);
export default Routes;
