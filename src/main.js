import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "@router";
import "@styles/Base.sass";

const Main = () => {
  return (
    <BrowserRouter>
      <Switch>{renderRoutes(routes)}</Switch>
    </BrowserRouter>
  );
};

export default Main;
