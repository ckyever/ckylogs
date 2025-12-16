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
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "user", element: <User /> },
      { path: "post", element: <Post /> },
    ],
    errorElement: <Error />,
  },
];

export default routes;
