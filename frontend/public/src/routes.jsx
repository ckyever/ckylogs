import * as constants from "./constants.jsx";
import { redirect } from "react-router";

import App from "./App.jsx";
import Error from "./components/Error.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Post from "./components/Post.jsx";
import Signup from "./components/Signup.jsx";
import User from "./components/User.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "login",
        element: <Login />,
        loader: async () => {
          if (localStorage.getItem(constants.LOCAL_STORAGE_USER_TOKEN)) {
            return redirect("/");
          }
        },
      },
      {
        path: "signup",
        element: <Signup />,
        loader: async () => {
          if (localStorage.getItem(constants.LOCAL_STORAGE_USER_TOKEN)) {
            return redirect("/");
          }
        },
      },
      { path: "user", element: <User /> },
      { path: "post", element: <Post /> },
    ],
    errorElement: <Error />,
  },
];

export default routes;
