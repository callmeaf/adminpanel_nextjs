'use client'

import React from 'react';
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {createTheme, ThemeProvider} from "@mui/material";
import {CacheProvider} from "@emotion/react";
import UiProvider from "@/context/ui/ui-context";
import AlertLayout from "@/components/Layout/Partials/AlertLayout";


const BaseLayout = ({children}) => {
    const rtlCache = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    })

    const rtlTheme = createTheme({
        direction: 'rtl',
        typography: {
            fontFamily: [
                'IRANYekanFont',
            ].join(','),
        },
    })
    return (
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={rtlTheme}>
                <UiProvider>
                    {children}
                    <AlertLayout/>
                </UiProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default BaseLayout;