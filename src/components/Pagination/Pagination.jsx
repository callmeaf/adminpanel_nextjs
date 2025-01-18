import React from 'react';
import Show from "@/components/Show";
import {Pagination as MUIPagination} from '@mui/material'

const Pagination = ({pagination, onPageChange}) => {
    const pageChangeHandler = (page) => {
        onPageChange({
            params: {
                page,
            }
        })
    }

    return (
        <Show
            when={pagination}
            whenChild={() => <MUIPagination count={pagination.meta.lastPage}
                                            onChange={(e, page) => pageChangeHandler(page)}/>}
        />
    );
};

export default Pagination;