import React from 'react';
import {Card as MUICard, CardContent} from "@mui/material";

const Card = ({children}) => {
    return (
        <MUICard variant={'outlined'}>
            <CardContent>
                {children}
            </CardContent>
        </MUICard>
    );
};

export default Card;