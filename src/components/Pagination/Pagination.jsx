import React from 'react';
import Show from "@/components/Show";
import {Pagination as MUIPagination, PaginationItem} from '@mui/material'

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
                                            showFirstButton
                                            showLastButton
                                            color={'primary'}
                                            onChange={(e, page) => pageChangeHandler(page)}
                                            renderItem={item => {

                                                return <PaginationItem {...item}
                                                                       sx={{pointerEvents: item.selected ? 'none' : 'initial'}}/>
                                            }}

            />}
        />
    );
};

export default Pagination;