import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = ({ setUse }) => {
    const { register, handleSubmit } = useForm({});
    const navigate = useNavigate();
   
    //מקבל מהשרת שמות המשתמשים
    const getData = async () => {
        const data = await fetch("http://localhost:3500/users");
        const users = await data.json();
        const newArray = await extractUsernameAndWebsite(users);
        return newArray;
    };
    //מחלצת שדות מאוביקטים ויוצרים אוביקטים חדשים
    const extractUsernameAndWebsite = (arr) => {
        return arr.map(({ username, website, id }) => ({
            username,
            website,
            id,
        }));
    };

    const checkData = async (data) => {
        try {
            const users = await getData();
            const isUserValid = users.some(
                ({ username, website }) =>
                    username === data.userName && website === data.password
            );
            const index = users.findIndex(
                ({ username, website }) =>
                    username === data.userName && website === data.password
            );
            isUserValid && index !== -1 && setUse(users[index]);
            
            isUserValid && index !== -1
                ? navigate("home/" + users[index].id)
                : alert(
                    "The name or password you entered does not exist in the system"
                );
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    return (
        <form onSubmit={handleSubmit(checkData)}>
            <label htmlFor="userName">
                enter your name:
                <br />
                <input
                    {...register("userName", { required: true })}
                    type="text"
                    id="userName"
                />
                <br />
            </label>
            <label htmlFor="password">
                enter your password:
                <br />
                <input
                    {...register("password", { required: true })}
                    type="password"
                    id="password"
                />
                <br />
            </label>
            <button>Click me</button>
        </form>
    );
};

export default Login;