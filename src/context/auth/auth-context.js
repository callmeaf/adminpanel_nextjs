import {createContext, useEffect, useReducer} from "react";
import initState from "@/context/auth/init-state";
import reducer from "@/context/auth/reducer";
import useApi from "@/hooks/use-api";
import {checkAuthenticateUser} from "@/thunks/auth-thunks";

export const AuthContext = createContext(initState)

const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState);
    const {handle} = useApi();
    useEffect(() => {
        handle(checkAuthenticateUser)
    }, []);
    return <AuthContext value={{state, dispatch}}>
        {children}
    </AuthContext>
}

export default AuthProvider