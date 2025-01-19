import React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import {useTranslations} from "next-intl";


let searchTimeout
const TableSearch = ({onSearch, t, searchParams}) => {
    const translateTable = useTranslations('Table')

    const searchHandler = (e) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }
        searchTimeout = setTimeout(() => {
            const searchInputValue = e.target.value.trim()
            onSearch({
                params: Object.fromEntries(searchParams.map(searchParam => [searchParam, searchInputValue]))
            })
        }, 700)
    }

    return (
        <TextField onInput={searchHandler} id={'search'} name={'search'}
                   label={`${translateTable('search_label')} ${searchParams.map(searchParam => t(searchParam + '_label')).join(', ')}`}
                   size={'small'} variant={'outlined'} fullWidth slotProps={{
            input: {
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                ),
            }
        }}/>
    );
};

export default TableSearch;