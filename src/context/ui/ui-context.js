'use client'

import {createContext, useReducer} from "react";
import initState from "@/context/ui/init-state";
import reducer from "@/context/ui/reducer";

export const UiContext = createContext(initState)

const UiProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)

    return <UiContext value={{state, dispatch}}>
        {children}
    </UiContext>
}

export default UiProvider