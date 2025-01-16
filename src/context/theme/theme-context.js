import {createContext, useReducer} from "react";
import initState from "@/context/theme/init-state";
import {SET_IS_DARK_MODE, SET_MESSAGE} from "@/context/theme/action-types";


export const ThemeContext = createContext(initState)

const reducer = (state, action) => {
    switch (action.type) {
        case SET_IS_DARK_MODE:
            return {
                ...state,
                isDarkMode: action.payload,
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
            }
    }

    return state
}

const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <ThemeContext value={{state, dispatch}}>
        {children}
    </ThemeContext>
}