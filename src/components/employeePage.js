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
import { message } from 'antd';
import { Radio } from 'antd';
import { Select } from 'antd';
import { getAllEmployees, signup, editUser } from '../util/APIUtils';
import { USER_ROLE } from '../constants';

const Option = Select.Option;



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
	
	searchByName = (value)=>{fetch('https://parkingsystem.herokuapp.com/api/users')
            .then(results => results.json())
            .then(res => {
				const result = res.filter((user)=>{ return user.name.includes(value)})
                this.setState({ rows: result });
            });}


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
function createData(employeeId, employeeName, email, phoneNumber, choice) {
    counter += 1;
    return { id: counter, employeeId, employeeName, email, phoneNumber, choice };
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
function handleChange(value) {
    console.log(`selected ${value}`);
}

class CustomPaginationActionsTable extends React.Component {
    state = {
        rows: [],
        page: 0,
        rowsPerPage: 10,
        visible: false,
        visibleEdit: false,
        employeeId:null,
        name: '',
        email: '',
        phoneNumber: '',
        role: 'PARKINGCLERK'
    };

    componentDidMount() {
        // fetch('https://parkingsystem.herokuapp.com/api/users/')
        //     .then(results => results.json())
        getAllEmployees()
            .then(res => {
                this.setState({ rows: res });
            });
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    showEditModal = (employee) => {
        this.setState({
            visibleEdit: true,
            employeeId:employee.id,
            name: employee.name,
            email: employee.email,
            phoneNumber: employee.phoneNumber
        });
    }

    handleOk = () => {
        setTimeout(() => {
            this.setState({ visible: false });
        }, 3000);
    }

    handleEditOk = () => {
        setTimeout(() => {
            this.setState({ visibleEdit: false });
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleEditCancel = () => {
        this.setState({ visibleEdit: false });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitRequest = () => {
        if(this.state.name.length<1){
            message.error("Name cannot be blank",3);
        }
        if(!this.state.email.includes('@')){
            message.error("Invalid Email",3);
        }
        if(this.state.phoneNumber.length>11){
            message.error("Phone Number should be less than 11 numbers",3);
        }
        // fetch("https://parkingsystem.herokuapp.com/api/auth/signup/",
        //     {
        //         method: 'POST', headers: new Headers({
        //             'Content-Type': 'application/json'
        //         }), mode: 'cors',
        //         body: JSON.stringify({
        //             name: this.state.name,
        //             username: this.state.name,
        //             email: this.state.email,
        //             password: this.state.name,
        //             phoneNumber: this.state.phoneNumber,
        //             role: this.state.role,
        //         })
        //     })
        //     .then(res => res.json())
        let signupRequest={
            name: this.state.name,
            username: this.state.name,
            email: this.state.email,
            password: this.state.name,
            phoneNumber: this.state.phoneNumber,
            role: this.state.role,
        }
        signup(signupRequest)
            .then(res=>message.success('Successfully register a new employee', 2))
            .catch(error=>{
                if(error.status===400){
                    message.error("Invalid Information. Please try again.",3);
                }
                if(error.status===500){
                    message.error("System Error. Please contact technical support.",3);
                }
            })
        

        setTimeout(() => {
            this.setState({ visible: false });
            // fetch('https://parkingsystem.herokuapp.com/api/users/')
            // .then(results => results.json())
            getAllEmployees()
            .then(res => {
                this.setState({ name:'', email:'', phoneNumber:'', role:'PARKINGCLERK', rows: res });
            });
        }, 2500);


    }

    freezeUser=(employee)=>{
        let freezeRequest=null;
        if(employee.status=='active'){
            freezeRequest={status:'Freezed'}
        }else{
            freezeRequest={status:'Active'}
        }
        editUser(employee.id,freezeRequest)
        .then(res=>{
            getAllEmployees()
            .then(res => {
                this.setState({ rows: res });
                message.success('Successfully change status of employee');
            });
        })
    }

    submitEditRequest = (employeeId) => {
        if(this.state.name.length<1){
            message.error("Name cannot be blank",3);
        }
        if(!this.state.email.includes('@')){
            message.error("Invalid Email",3);
        }
        if(this.state.phoneNumber.length>11){
            message.error("Phone Number should be less than 11 numbers",3);
        }
        
        let editRequest={
            name: this.state.name,
            username: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
        }
        editUser(employeeId,editRequest)
            .then(res=>message.success('Successfully change employee information', 2))
            .catch(error=>{
                if(error.status===400){
                    message.error("Invalid Information. Please try again.",3);
                }
                if(error.status===500){
                    message.error("System Error. Please contact technical support.",3);
                }
            })
        

        setTimeout(() => {
            this.setState({ visibleEdit: false });
            // fetch('https://parkingsystem.herokuapp.com/api/users/')
            // .then(results => results.json())
            getAllEmployees()
            .then(res => {
                this.setState({ name:'', email:'', phoneNumber:'', role:'PARKINGCLERK', rows: res });
            });
        }, 2500);


    }

    showCreateUserButton=(classes)=>{
        if(localStorage.getItem(USER_ROLE)=='ROLE_ADMIN'){
        return <Button style={{ padding: '10px', background: '#1890ff', color: 'white', marginTop: '10px', marginLeft: '10px', marginBottom: '10px' }} variant="contained" className={classes.button} onClick={this.showModal}>New</Button>
        }else{
            return <div></div>
        }
    }

    render() {
        console.log(this.state.rows)
        const { classes } = this.props;
        const { rows, rowsPerPage, page, visible, visibleEdit, email, phoneNumber, role } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const Search = Input.Search;
        return (
            <Paper className={classes.root}>
                <div>
                    {this.showCreateUserButton(classes)}
                    <Search style={{ width: 200, float: 'right', marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}
                        placeholder="Search"
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
                                <TableCell style={{ color: 'black' }}><h3>Email</h3></TableCell>
                                <TableCell style={{ color: 'black' }}><h3>Phone Number</h3></TableCell>
                                <TableCell style={{ color: 'black' }}><h3>Edit</h3></TableCell>

                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                let freezeButton='Active';
                                if(row.status=='active'){
                                    freezeButton='Freezed'
                                }
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.phoneNumber}</TableCell>
                                        <TableCell><a onClick={()=>this.showEditModal(row)}>Edit </a>|<a onClick={()=>this.freezeUser(row)}> {freezeButton}</a></TableCell>
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
                <Modal
                    visible={visible}
                    title={<span><h2>Register Employee</h2></span>}
                    title={<span><h2>Register Employee</h2></span>}
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
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </div>

                        <div>
                            <TextField
                                id="standard-email"
                                label="Email"
                                className={classes.textField}
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                            />
                        </div>

                        <div>
                            <TextField
                                id="standard-phoneNumber"
                                label="Phone Number"
                                className={classes.textField}
                                value={this.state.phoneNumber}
                                onChange={this.handleChange('phoneNumber')}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <br />
                            <br />
                            <span><h3>Position</h3></span>
                            <Radio.Group defaultValue="PARKINGCLERK" buttonStyle="solid" onChange={(e) => {this.setState({ role: e.target.value } );}}>
                                <Radio.Button value="PARKINGCLERK">PARKINGCLERK</Radio.Button>
                                <Radio.Button value="MANAGER">MANAGER</Radio.Button>
                               
                            </Radio.Group>
                            
                            {/* <Select defaultValue="PARKINGCLERK" style={{ width: 120 }} onChange={(e) => {this.setState({ role: e.target.value })}}>
                                <Option value="PARKINGCLERK">PARKINGCLERK</Option>
                                <Option value="MANAGER">MANAGER</Option>
                                
                            </Select> */}
                        </div>
                    </form>
                </Modal>
                <Modal
                    visible={visibleEdit}
                    title={<span><h2>Edit</h2></span>}
                    onOk={this.submitEeditRequest}
                    onCancel={this.handleEditCancel}
                    footer={[
                        <Button key="back" onClick={this.handleEditCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" onClick={()=>this.submitEditRequest(this.state.employeeId)}>
                            Confirm
                    </Button>,
                    ]}
                >
                    <form className={classes.container} noValidate autoComplete="off">

                        <div>
                            <TextField
                                id="standard-name"
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                        </div>

                        <div>
                            <TextField
                                id="standard-email"
                                label="Email"
                                className={classes.textField}
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                            />
                        </div>

                        <div>
                            <TextField
                                id="standard-phoneNumber"
                                label="Phone Number"
                                className={classes.textField}
                                value={this.state.phoneNumber}
                                onChange={this.handleChange('phoneNumber')}
                                margin="normal"
                            />
                        </div>
                    </form>
                </Modal>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);