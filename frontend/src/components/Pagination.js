import TablePagination from '@mui/material/TablePagination';

const Pagination = ({ page = 0, rowsPerPage = 10, count, onPageChange }) => {
    return (
        <div className="pagination-container">
            <TablePagination
                component="div"
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => onPageChange(newPage, rowsPerPage)}
                onRowsPerPageChange={(event) =>
                    onPageChange(0, parseInt(event.target.value, 10)) // Reset page to 0 when rowsPerPage changes
                }
                classes={{
                    toolbar: 'pagination-toolbar',
                    selectLabel: 'pagination-label',
                    displayedRows: 'pagination-displayed-rows',
                    actions: 'pagination-actions',
                }}
            />
        </div>
    );
};
export default Pagination;
