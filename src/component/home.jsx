import React, { useContext} from "react";
import { Data } from "../App";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const user = useContext(Data);

  return (
    user && (
      <div>
        <h1>Hello {user.username}, I'm glad to see you again </h1>
        <button onClick={() => navigate("/todos/" + user.id)}>for Todos Click here</button>
        <button onClick={() => navigate("/posts/" + user.id)}>for Posts Click here</button>
        <button onClick={() => navigate("/albums/" + user.id)}>for Albums Click here</button>

      </div>
    )
  );
}