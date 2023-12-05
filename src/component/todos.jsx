import React, { useContext, useState, useEffect } from "react";
import { Data } from "../App";
import SelectComponent from "./select";
import Search from "./search";
import Task from './task';

export default function Todos() {
    const [arreyTodos, setArreyTodos] = useState([]);
    const [clone, setClone] = useState([]);

    const [title, setTitle] = useState("");
    const [completed, satCompleted] = useState("");

    const user = useContext(Data);

    const getTodos = async (userId) => {
        const data = await fetch(
            `http://localhost:3500/todos?userId=${userId}`
        );
        const todos = await data.json();
        setArreyTodos(todos);
        setClone([...todos]);
    };

    const enterNewTask = async () => {
        const isCompletedValid = completed === "true" || completed === "false";
        if (title.length > 0 && isCompletedValid) {
            const response = await fetch("http://localhost:3500/todos");
            const todos = await response.json();
            const lastTodo = todos[todos.length - 1];
            await fetch("http://localhost:3500/todos", {
                method: "POST",
                body: JSON.stringify({
                    userId: user.id,
                    id: lastTodo.id + 1,
                    title: title,
                    completed: completed === "true",
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const newTodo = {
                userId: user.id,
                id: lastTodo.id + 1,
                title: title,
                completed: completed === "true",
            };
            setArreyTodos((prevTodos) => [...prevTodos, newTodo]);
            setClone((prevTodos) => [...prevTodos, newTodo]);
        }
        setTitle("");
        satCompleted("");
    };

    useEffect(() => {
        if (user) {
            getTodos(user.id);
        }
    }, [user]);

    return (
        user && (
            <div>
                <div className="title">
                <h1>Hello {user.username}, I'm glad to see you again </h1>
                </div>
                <div className="enterNewTask">
                    <h1>Enter details <br />
                        to add a new task</h1>
                    <label htmlFor="title">
                        enter title:
                        <br />
                        <input
                            name="title"
                            value={title}
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                    </label>
                    <label htmlFor="completed">
                        is completed:
                        <br />
                        <input
                            name="completed"
                            value={completed}
                            type="text"
                            onChange={(e) => satCompleted(e.target.value)}
                        />
                        <br />
                    </label>
                    <button onClick={enterNewTask}>save</button>
                </div>

                <SelectComponent
                    arreyTodos={arreyTodos}
                    setArreyTodos={setArreyTodos}
                />
                <Search clone={clone} setArreyTodos={setArreyTodos} />

                {arreyTodos.map((item) => (
                    <Task obj={item} setArreyTodos={setArreyTodos} />
                ))}
            </div>
        )
    );
}