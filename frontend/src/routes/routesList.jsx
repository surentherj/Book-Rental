import React from "react";

const Landing = React.lazy(() => import("../pages/landingPage"));

const routesList = [
  { path: "/", exact: true, name: "Landing", component: Landing },
];

export default routesList;
