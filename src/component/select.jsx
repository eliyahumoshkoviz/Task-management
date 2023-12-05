import React from "react";

const SelectComponent = ({ arreyTodos, setArreyTodos }) => {
    const sortByBooleanField = (arr) => {
        const sortedArray = [...arr];
        sortedArray.sort((a, b) => {
            return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
        });
        setArreyTodos(sortedArray);
    };

    const sortByNumberField = (arr) => {
        const sortedArray = [...arr];
        sortedArray.sort((a, b) => a.id - b.id);
        setArreyTodos(sortedArray);
    };

    const sortByFieldAlphabetically = (arr, field) => {
        const sortedArray = [...arr].sort((a, b) => {
            return a[field].localeCompare(b[field]);
        });
        setArreyTodos(sortedArray);
    };

    const handleSelectChange = (event) => {
        if (event.target.value === "option1") {
            sortByBooleanField(arreyTodos);
        } else if (event.target.value === "option2") {
            sortByNumberField(arreyTodos);
        } else if (event.target.value === "option3") {
            sortByFieldAlphabetically(arreyTodos, "title");
        }
    };

    return (
        <div className="select">
            <label htmlFor="selectOption">Display options</label>
            <select id="selectOption" onChange={handleSelectChange}>
                <option value="">selectOption</option>
                <option value="option1">Selection by performance</option>
                <option value="option2">Selection by serial</option>
                <option value="option3">Alphabetical sorting</option>
            </select>
        </div>
    );
};

export default SelectComponent;