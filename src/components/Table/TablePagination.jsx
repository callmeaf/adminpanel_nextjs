import React from 'react';
import Show from "@/components/Show";
import {Grid2, Pagination as MUIPagination, PaginationItem, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
import Box from "@mui/material/Box";

const TablePagination = ({pagination, onPageChange}) => {
    const translateTable = useTranslations('Table')

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
            whenChild={() =>
                <Grid2 container spacing={2}>
                    <Grid2 size={{xs: 12, md: 6}}>
                        <MUIPagination count={pagination.meta.lastPage}
                                       showFirstButton
                                       showLastButton
                                       color={'primary'}
                                       onChange={(e, page) => pageChangeHandler(page)}
                                       renderItem={item => {
                                           item.selected = item.type === 'page' && item.page.toString() === pagination.meta.currentPage.toString()
                                           return <PaginationItem {...item}
                                                                  sx={{pointerEvents: item.selected ? 'none' : 'initial'}}/>
                                       }}

                        />
                    </Grid2>
                    <Grid2 size={{xs: 12, md: 6}}>
                        <Box className={'text-end'}>
                            <Typography component={'span'} sx={{mx: 0.5}}>
                                1
                            </Typography>
                            <Typography component={'span'} sx={{mx: 0.5}}>
                                {translateTable('to')}
                            </Typography>
                            <Typography component={'span'}>
                                5
                            </Typography>
                            <Typography component={'span'} sx={{mx: 0.5}}>
                                {translateTable('from')}
                            </Typography>
                            <Typography component={'span'} sx={{mx: 0.5}}>
                                10
                            </Typography>
                            <Typography component={'span'} sx={{mx: 0.5}}>
                                {translateTable('total')}
                            </Typography>
                        </Box>
                    </Grid2>
                </Grid2>
            }
        />
    );
};

export default TablePagination;