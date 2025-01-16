import React, {useContext} from 'react';
import {UiContext} from "@/context/ui/ui-context";
import {Alert, Snackbar} from "@mui/material";
import {SET_MESSAGE} from "@/context/ui/action-types";

const AlertLayout = () => {
    const {state: uiState, dispatch: uiDispatch} = useContext(UiContext)
    const {message} = uiState

    const messageCloseHandler = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        uiDispatch({
            type: SET_MESSAGE,
            payload: null,
        })
    }

    if (message.body.trim().length === 0) {
        return
    }

    return (
        <Snackbar open autoHideDuration={null} onClose={messageCloseHandler}>
            <Alert
                onClose={messageCloseHandler}
                severity={message.type}
                variant={'filled'}
                sx={{width: '100%'}}
            >
                {message.body}
            </Alert>
        </Snackbar>
    );
};

export default AlertLayout;