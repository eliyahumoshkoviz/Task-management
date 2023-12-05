import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./css/todos.css";
import "./css/search.css";
import "./css/select.css";
import "./css/task.css";

import Login from "./component/login";
import Home from "./component/home";
import Todos from "./component/todos";
import Posts from "./component/posts";
import Albums from "./component/albums";

const Data = createContext();

function App() {
    const [use, setUse] = useState();
    return (
        <Data.Provider value={use}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login setUse={setUse} />} />
                    <Route path="home/:id" element={<Home />} />
                    <Route path="todos/:id" element={<Todos />} />
                    <Route path="posts/:id" element={<Posts />} />
                    <Route path="albums/:id" element={<Albums />} />
                </Routes>
            </div>
        </Data.Provider>
    );
}

export default App;
export { Data };