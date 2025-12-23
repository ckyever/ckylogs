import * as constants from "./constants.jsx";
import { redirect } from "react-router";

import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Error from "./components/Error.jsx";
import Login from "./components/Login.jsx";
import Post from "./components/Post.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <Login />,
        loader: async () => {
          if (localStorage.getItem(constants.LOCAL_STORAGE_USER_TOKEN)) {
            return redirect("/dashboard");
          }
        },
      },
      { path: "dashboard", element: <Dashboard /> },
      { path: "post/:id", element: <Post /> },
    ],
    errorElement: <Error />,
  },
];

export default routes;
