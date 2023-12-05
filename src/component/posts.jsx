import React, { useContext, useState, useEffect } from "react";
import { Data } from "../App";

export default function Posts() {
    const user = useContext(Data);
    const [arreyposts, setArreyposts] = useState([]);
    const getPosts = async (userId) => {
        const data = await fetch(
            `http://localhost:3500/posts?userId=${userId}`
        );
        const posts = await data.json();
        setArreyposts(posts);
    };
    useEffect(() => {
        if (user) {
            getPosts(user.id);
        }
    }, [user]);


    return (
        user && (
            <div>
                <h1>Hello {user.username}, I'm glad to see you again </h1>
                {arreyposts.map((item, id) => (
                    <div className="postsContainer" key={id}>
                        <span>Post number: {item.id}</span>
                        <br />
                        <span>Title: {item.title}</span>
                    </div>
                ))}
            </div>
        )
    );
}