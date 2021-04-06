import React from "react";
import { Redirect } from "react-router-dom";
import NoMatch from "@containers/NoMatch";
import Calendar from "@containers/Calendar";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/Calendar"} />,
  },
  {
    path: "/Calendar",
    component: Calendar,
    breadcrumbName: "Calendar",
  },
  {
    path: "*",
    component: NoMatch,
    exact: true,
  },
];

export default routes;
