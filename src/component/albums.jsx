import React, { useContext, useState, useEffect } from "react";
import { Data } from "../App";

export default function Albums() {
    const [arreyaAlbums, setArreyAlbums] = useState([]);
    const user = useContext(Data);

    const getAlbum = async (userId) => {
        try {
            const data = await fetch(
                `http://localhost:3500/albums?userId=${userId}`
            );
            const album = await data.json();
            setArreyAlbums(album);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    };
    useEffect(() => {
        if (user) {
            getAlbum(user.id);
        }
    }, [user]);


    return (
        user && (
            <div>
                {arreyaAlbums.map((item, id) => (
                    <div className="albumContainer" key={id}>
                        <span>Album number: {item.id}</span>
                        <br />
                    </div>
                ))}
            </div>
        )
    );
}