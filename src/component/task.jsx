import React, { useState } from "react";


export default function Task({obj,setArreyTodos}) {

    const [editMode, setEditMode] = useState({ id: null, title: "" });


    const fieldUpdate = async (filed, newValue, id) => {
        try {
            await fetch(`http://localhost:3500/todos/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    [filed]: newValue,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            updateArrayAtIndex([filed], id, newValue);
        } catch (error) {
            console.error("Error updating post title:", error);
        }
    };

    const updateArrayAtIndex = (field, iudex, newValue) => {
        setArreyTodos((prevArray) =>
            prevArray.map((item) =>
                item.id === iudex ? { ...item, [field]: newValue } : item
            )
        );
    };

    const EditTitle = (id, title) => {
        setEditMode({ id, title });
    };

    const deleting = async (id) => {
        try {
            await fetch(`http://localhost:3500/todos/${id}`, {
                method: "DELETE",
            });

            setArreyTodos((prevTodos) =>
                prevTodos.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="taskContainer" key={obj.id}>
            <span>task number : {obj.id}</span>
            <br />
            <span>Title : {obj.title}</span>
            <br />
            <input
                type="checkbox"
                onChange={() => {
                    fieldUpdate(
                        "completed",
                        !obj.completed,
                        obj.id
                    );
                }}
            />

            <span>completed : {`${obj.completed}`}</span>
            <br />
            <button
                onClick={() => {
                    EditTitle(obj.id, obj.title);
                }}
            >
                Edit title
            </button>
            {editMode.id === obj.id && (
                <>
                    <input
                        type="text"
                        value={editMode.title}
                        onChange={(e) =>
                            setEditMode({
                                ...editMode,
                                title: e.target.value,
                            })
                        }
                    />
                    <button
                        onClick={() => {
                            fieldUpdate(
                                "title",
                                editMode.title,
                                editMode.id
                            );
                            setEditMode({ id: null, title: "" });
                        }}
                    >
                        Save
                    </button>
                </>
            )}
            <button onClick={() => deleting(obj.id)}>
                Delete
            </button>
        </div>
    )

}