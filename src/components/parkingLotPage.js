import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import { Input } from 'antd';

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

class TablePaginationActions extends React.Component {
    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);

let counter = 0;
function createData(parkingLotId, parkingLotName, capacity, choice) {
    counter += 1;
    return { id: counter, parkingLotId, parkingLotName, capacity, choice };
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class CustomPaginationActionsTable extends React.Component {
    state = {
        rows: [
            createData(1, '停車場A', 10),
            createData(2, '停車場B', 23),
            createData(3, '停車場C', 49),
            createData(4, '停車場D', 9),
            createData(5, '停車場E', 13),
            createData(6, '停車場F', 16),
            createData(7, '停車場G', 5),
            createData(8, '停車場H', 3),
            createData(9, '停車場I', 22),
            createData(10, '停車場J', 12),
            createData(11, '停車場K', 17),
            createData(12, '停車場L', 25),
            createData(13, '停車場M', 66),
            createData(14, '停車場N', 28),
            createData(15, '停車場O', 38),
           
           
        ],
        page: 0,
        rowsPerPage: 10,
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const Search = Input.Search;
        return (
            <Paper className={classes.root}>
                <div>
                    <Button style={{ padding: '10px', background: '#1890ff', color: 'white', marginTop: '10px', marginLeft: '10px', marginBottom: '10px' }} variant="contained" className={classes.button}>新建</Button>
                    <Search style={{ width: 200, float: 'right', marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}
                        placeholder="輸入文字搜索"
                        onSearch={value => console.log(value)}
                        enterButton
                    />


                </div>

                <div className={classes.tableWrapper}>

                    <Table className={classes.table}>
                        <TableHead >
                            <TableRow style={{ background: '#1890ff' }}>
                                <TableCell style={{ color: 'white' }}><b>ID</b></TableCell>
                                <TableCell style={{ color: 'white' }}><b>名字</b></TableCell>
                                <TableCell style={{ color: 'white' }}><b>大小</b></TableCell>
                                <TableCell style={{ color: 'white' }}><b>操作</b></TableCell>

                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.parkingLotId}
                                        </TableCell>
                                        <TableCell>{row.parkingLotName}</TableCell>
                                        <TableCell>{row.capacity}</TableCell>
                                        <TableCell><a href=" ">修改 </a>|<a href=" "> 凍結</a></TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 30]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);