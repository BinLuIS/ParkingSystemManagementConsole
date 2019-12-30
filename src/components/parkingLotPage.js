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
import { Modal } from 'antd';
import TextField from '@material-ui/core/TextField';
import {
    Form, Select, AutoComplete,
} from 'antd';
import { message } from 'antd';
import { getAllParkingLots,getAllParkingClerks, addParkingLots,assignParkingLotToParkingClerks } from '../util/APIUtils';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


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
function createData(parkingLotId, parkingLotName, capacity, parkingClerk, choice) {
    counter += 1;
    return { id: counter, parkingLotId, parkingLotName, capacity, parkingClerk, choice };
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
        rows: [],
        page: 0,
        rowsPerPage: 10,
        visible: false,
        id: -1,
        name: '',
        capacity: '',
        NotImportant: 1,
        activeModal: null,
        selectedClerkId: -1,
        parkingclerks: [],

    };
    componentDidMount() {
        // fetch('https://parkingsystem.herokuapp.com/parkinglots/')
        //     .then(results => results.json())
        getAllParkingLots()
            .then(res => {
                this.setState({ rows: res });
            });
        // fetch('https://parkingsystem.herokuapp.com/parkingclerks/')
        //     .then(results => results.json())
        getAllParkingClerks()
            .then(res => {
                this.setState({ parkingclerks: res });
            });
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    showModal = (type) => {
        this.setState({
            visible: true,
            activeModal: type,
        });
    }
    passDatatoModal = (type, id, name, capacity) => {
        this.setState({
            id, name, capacity
        })
        this.showModal(type);
    }

    handleOk = () => {
        setTimeout(() => {
            this.setState({ visible: false });
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false, activeModal: null });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitRequest = () => {
        // fetch("https://parkingsystem.herokuapp.com/parkinglots/",
        //     {
        //         method: 'POST', headers: new Headers({
        //             'Content-Type': 'application/json'
        //         }), mode: 'cors',
        //         body: JSON.stringify({
        //             name: this.state.name,
        //             capacity: this.state.capacity
        //         })
        //     })
        //     .then(res => res.json())
        addParkingLots({name: this.state.name,capacity: this.state.capacity})
            .then(res => console.log(res))
        message.success('Successfully add parking lot', 1);

        setTimeout(() => {
            this.setState({ activeModal: null });
            // fetch('https://parkingsystem.herokuapp.com/parkinglots/')
            // .then(results => results.json())
            getAllParkingLots()
            .then(res => {
                this.setState({ name:'', capacity: '', rows: res });
            });
        }, 1500);


    }

    getParkingClerkId = (event) => {
        this.setState({ selectedClerkId: event })
    }

    submitAssignRequest = () => {
        // console.log("boy: " + this.state.selectedClerkId);
        // console.log("lot: " + this.state.id)
        // fetch("https://parkingsystem.herokuapp.com/parkingclerks/" + this.state.selectedClerkId + "/parkinglots/",
        //     {
        //         method: 'POST', headers: new Headers({
        //             'Content-Type': 'application/json'
        //         }), mode: 'cors',
        //         body: JSON.stringify({
        //             parkingLotId: this.state.id,
        //         })
        //     })
        //     .then(res => res.json())
        assignParkingLotToParkingClerks(this.state.selectedClerkId,{parkingLotId: this.state.id})
        .then(res=>message.success('Successfully assign parking clerk (ID: ' + this.state.selectedClerkId + ') to management parking lot, '+this.state.name, 2))

        setTimeout(() => {
            this.setState({ activeModal: null });
            // fetch('https://parkingsystem.herokuapp.com/parkinglots/')
            // .then(results => results.json())
            getAllParkingLots()
            .then(res => {
                this.setState({ name:'', capacity: '', parkingClerks:'', rows: res });
            });
        }, 2500);
    }
	
	searchByName = (value)=>{getAllParkingLots()
            .then(res => {
				const result = res.filter((parkingLot)=>{ return parkingLot.name.includes(value)})
                this.setState({ rows: result });
            });}
			
	searchByCapacity = (value)=>{fetch('https://parkingsystem.herokuapp.com/parkinglots/')
            .then(results => results.json())
            .then(res => {
				const result = res.filter((parkingLot)=>{ return parseInt(parkingLot.capacity) == value})
                this.setState({ rows: result });
            });}

    render() {
        const { classes } = this.props;
        const { rows, rowsPerPage, page, visible, capacity, activeModal, id, selectedClerkId } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const Search = Input.Search;
        return (
            <Paper className={classes.root}>
                <div>
                    <Button style={{ padding: '10px', background: '#1890ff', color: 'white', marginTop: '10px', marginLeft: '10px', marginBottom: '10px' }} variant="contained" className={classes.button} onClick={() => this.showModal("Create")}>New</Button>
                    <Search style={{ width: 200, float: 'right', marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}
                        placeholder="Search By Name"
                        onSearch={value => this.searchByName(value)}
                        enterButton
                    />


                </div>

                <div className={classes.tableWrapper}>

                    <Table className={classes.table}>
                        <TableHead >
                            <TableRow style={{ background: '#fafafa' }}>
                                <TableCell style={{ color: 'black' }}><h3>ID</h3></TableCell>
                                <TableCell style={{ color: 'black' }}><h3>Name</h3></TableCell>
                                <TableCell style={{ color: 'black' }}><h3>Capacity</h3></TableCell>
                                {/* <TableCell style={{ color: 'black' }}><h3>負責停車員</h3></TableCell> */}
                                <TableCell style={{ color: 'black' }}><h3>Action</h3></TableCell>

                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.capacity}</TableCell>
                                        {/* <TableCell>{row.parkingClerk}</TableCell> */}
                                        <TableCell><a onClick={() => this.passDatatoModal("Associate", row.id, row.name, row.capacity)}>Assign Parking Clerk</a></TableCell>
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
                {/* Creation Modal */}
                <Modal
                    visible={activeModal === "Create"}
                    title="Register Parking Lot"
                    onOk={this.submitRequest}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" onClick={this.submitRequest}>
                            Confirm
                    </Button>,
                    ]}
                >
                    <form className={classes.container} noValidate autoComplete="off">

                        <div>
                            <TextField
                                id="standard-name"
                                label="Parking Lot Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </div>

                        <div>
                            <TextField
                                id="standard-capacity"
                                label="Parking Lot Capacity"
                                className={classes.textField}
                                value={this.state.capacity}
                                onChange={this.handleChange('capacity')}
                                margin="normal"
                            />
                        </div>

                    </form>
                </Modal>
                <Modal
                    title="Assign Parking Clerk"
                    visible={activeModal === "Associate"}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" onClick={this.submitAssignRequest}>
                            Confirm
                    </Button>,
                    ]}
                >
                    <Form layout="vertical">
                        <FormItem label="ID">
                            <Input value={this.state.id} disabled />
                        </FormItem>
                        <FormItem label="Parking Lot Name">
                            <Input value={this.state.name} disabled />
                        </FormItem>
                        <FormItem label="Parking Lot Capacity">
                            <Input value={this.state.capacity} disabled />
                        </FormItem>
                        <FormItem label="Assign Parking Clerk">
                            <Select onChange={(e) => this.setState({ selectedClerkId: e })}>
                                {this.state.parkingclerks.map(
                                    parkingClerk => {
                                        return (<Option value={parkingClerk.id} key={parkingClerk.id}>{parkingClerk.name}</Option>);
                                    }
                                )}
                            </Select>

                        </FormItem>
                    </Form>
                </Modal>


            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
