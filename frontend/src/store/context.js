import { useState, createContext } from "react";


const UserContext = createContext(
    {
        view : "light",
        grid : true,
        setView: () => { },
        setGrid: () => { }
    }
);

export default UserContext;