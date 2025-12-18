import "./styles/App.css";
import { useState } from "react";
import { Outlet } from "react-router";

function App() {
  const [userToken, setUserToken] = useState("");

  return (
    <>
      <Outlet context={{ userToken, setUserToken }} />
    </>
  );
}

export default App;
