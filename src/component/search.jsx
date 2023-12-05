import React from "react";

const ObjectSearch = ({ clone, setArreyTodos }) => {
        
    const handleSearch = (e) => {
        const inputLetter = e.target.value;
        const searchResults = searchByLetter(clone, inputLetter);
        
        if (inputLetter === "") {
            setArreyTodos(clone);
        } else if (searchResults.length === 0) {
            alert("No results found");
        } else {
            setArreyTodos(searchResults)

        }
    };
    
    const searchByLetter = (array, letter) => {
        return array.filter((object) => object.title.startsWith(letter));
    };

    return (
        <div className="search">
            <h1>Search tasks</h1>
            <input
                type="text"
                onChange={handleSearch}
                placeholder="Enter letter"
            />
        </div>
    );
};

export default ObjectSearch;
