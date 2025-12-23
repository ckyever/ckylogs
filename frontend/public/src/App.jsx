import "./styles/App.css";
import * as constants from "./constants.jsx";
import { useState } from "react";
import { Outlet } from "react-router";

function App() {
  const [userToken, setUserToken] = useState(
    localStorage.getItem(constants.LOCAL_STORAGE_USER_TOKEN)
  );
  const [username, setUsername] = useState(
    localStorage.getItem(constants.LOCAL_STORAGE_USERNAME)
  );
  const [userId, setUserId] = useState(
    localStorage.getItem(constants.LOCAL_STORAGE_USER_ID)
  );

  return (
    <>
      <Outlet
        context={{
          userToken,
          setUserToken,
          username,
          setUsername,
          userId,
          setUserId,
        }}
      />
    </>
  );
}

export default App;
