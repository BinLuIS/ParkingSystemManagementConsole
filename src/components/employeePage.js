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
import { getAllEmployees, signup } from '../util/APIUtils';

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
        name: '',
        email: '',
        phoneNumber: '',
        role: 'PARKINGCLERK',
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

    handleOk = () => {
        setTimeout(() => {
            this.setState({ visible: false });
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitRequest = () => {
        if(this.state.name.length<1){
            message.error("名字需大於1個字元",3);
        }
        if(this.state.phoneNumber.length>11){
            message.error("電話號碼需少於11個數字",3);
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
            .then(res=>message.success('成功添加員工', 2))
            .catch(error=>{
                if(error.status===400){
                    message.error("輸入資料不符規格，請重新輸入",3);
                }
                if(error.status===500){
                    message.error("處理申請錯誤",3);
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


    render() {
        console.log(this.state.rows)
        const { classes } = this.props;
        const { rows, rowsPerPage, page, visible, email, phoneNumber, role } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const Search = Input.Search;
        return (
            <Paper className={classes.root}>
                <div>
                    <Button style={{ padding: '10px', background: '#1890ff', color: 'white', marginTop: '10px', marginLeft: '10px', marginBottom: '10px' }} variant="contained" className={classes.button} onClick={this.showModal}>新建</Button>
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
                                <TableCell style={{ color: 'white' }}><b>姓名</b></TableCell>
                                <TableCell style={{ color: 'white' }}><b>Email</b></TableCell>
                                <TableCell style={{ color: 'white' }}><b>電話號碼</b></TableCell>
                                <TableCell style={{ color: 'white' }}><b>操作</b></TableCell>

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
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.phoneNumber}</TableCell>
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
                <Modal
                    visible={visible}
                    title={<span><h2>新建員工</h2></span>}
                    title={<span><h2>新建員工</h2></span>}
                    onOk={this.submitRequest}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" onClick={this.submitRequest}>
                            確認
                    </Button>,
                    ]}
                >
                    <form className={classes.container} noValidate autoComplete="off">

                        <div>
                            <TextField
                                id="standard-name"
                                label="姓名"
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
                                label="電話號碼"
                                className={classes.textField}
                                value={this.state.phoneNumber}
                                onChange={this.handleChange('phoneNumber')}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <br />
                            <br />
                            <span><h3>職位</h3></span>
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
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);