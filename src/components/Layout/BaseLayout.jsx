'use client'

import React from 'react';
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {CacheProvider} from "@emotion/react";
import AlertLayout from "@/components/Layout/Partials/AlertLayout";
import {createPortal} from "react-dom";

const BaseLayout = ({children}) => {
    const rtlCache = React.useMemo(() => createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    }), [])

    const rtlTheme = React.useMemo(() => createTheme({
        direction: 'rtl',
        typography: {
            fontFamily: [
                'IRANYekanFont',
            ].join(','),
        },

    }), [])

    return (
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={rtlTheme}>
                <CssBaseline />
                {children}
                <AlertLayout/>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default BaseLayout;