import { useReducer } from "react";
import UserContext from "./context";

const reducer = (state, action) => {
    if(action.type === "changeView"){
        return {...state, view: action.payload}
    }
    if(action.type === "changeGrid"){
        return {...state, grid: action.payload}
    }
}

const defaultCtx = {
    view : "light",
    grid : true,
}



export default function UserProvider(props) {
    
    const [userView , dispatchUserView] = useReducer(reducer,defaultCtx);

    const setView = () => {
        dispatchUserView({type: "changeView", payload: userView.view === "light" ? "dark" : "light"})
    }

    const setGrid = () => {
        dispatchUserView({type: "changeGrid", payload: !userView.grid})
    }

    const ctx = {
        view : userView.view,
        grid : userView.grid,
        setView : setView,
        setGrid : setGrid,
    }

    return (
        <UserContext.Provider value={ctx}>
            {props.children}
        </UserContext.Provider>
    )

}