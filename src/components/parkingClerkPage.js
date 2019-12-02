import React, { Component } from 'react'
import { Table, Transfer, Modal, message, Input } from 'antd';
import { signup, getAllParkingClerks, getAllParkingLots, assignParkingLotToParkingClerks } from '../util/APIUtils';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { USER_ROLE } from '../constants';

var myID;
var allLots;
var targetKeys;
export default class parkingClerksTable extends Component {
    state = {
        clerks: [],
        lots: [],
        lotsNoClerk: [],
        myLots: [],
        allLots: [],
        targetKeys: [],
        selectedKey: [],
        visible: false,
        name: '',
        email: '',
        phoneNumber: '',
        status: 'available',


    }


    componentDidMount() {
        getAllParkingClerks()
            .then(res => {
                this.setState({ clerks: res });
            });
        getAllParkingLots()
            .then(res => {
                this.setState({ lots: res });
            });
    }

    findAllLots = (id) => {
        const lotsNoClerk = this.state.lots.filter(lot => lot.parkingBoy === null || lot.parkingBoy.id === id);
        myID = id;
        allLots = lotsNoClerk.map(lot => {
            return {
                key: lot.id.toString(),
                title: lot.name,
                description: lot.name,
                disabled: lot.parkingBoy != null ? lot.parkingBoy.id === id : false
            }
        })

        const myLots = this.state.lots.filter(lot => lot.parkingBoy != null).filter(parkingLot => parkingLot.parkingBoy.id === id);
        targetKeys = myLots.map(lot => {
            return lot.id.toString()
        })

    }

    findMyLots = (id) => {
        const myLots = this.state.lots.filter(lot => lot.parkingBoy != null).filter(parkingLot => parkingLot.parkingBoy.id === id);
        return myLots.map(lot => {
            return lot.id.toString()
        })

    }

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        // this.setState({ targetKeys: nextTargetKeys });
        const parkingLotName = this.state.lots.filter(lot => lot.id == moveKeys[0])

        //Assign lot to clerk
        assignParkingLotToParkingClerks(myID, { parkingLotId: moveKeys[0] })
            .then(res => message.success('A Parking Clerk (ID ' + myID + ') is assigned to manage Parking Lot (Name: ' + parkingLotName[0].name + ')', 2))
            .then(() => getAllParkingLots()
                .then(res => {
                    this.setState({ lots: res });
                }))





    }

    handleFieldChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSearch = (dir, value) => {
        console.log('search:', dir, value);
    };

    handleSelectChange = (sourceSelectedKeys) => {
        //this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    }
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

    submitRequest = (event) => {
        if (this.state.name.length < 1) {
            message.error("Name cannot be blank", 3);
        }
        if (!this.state.email.includes('@')) {
            message.error("Invalid Email", 3);
        }
        if (this.state.phoneNumber.length > 11) {
            message.error("Phone Number should be less than 11 numbers", 3);
        }
        let signupRequest = {
            name: this.state.name,
            username: this.state.name,
            email: this.state.email,
            password: this.state.name,
            phoneNumber: this.state.phoneNumber,
            role: "PARKINGCLERK"

        }
        signup(signupRequest)
            .then(res => { message.success('A Parking Clerk is registered', 1); })
            .catch(error => {
                if (error.status === 400) {
                    message.error("Invalid Information. Please try again.", 3);
                }
                if (error.status === 500) {
                    message.error("System Error. Please contact technical support.", 3);
                }
            })
        setTimeout(() => {
            this.setState({ visible: false });
            getAllParkingClerks()
                .then(res => {
                    this.setState({ name: '', email: '', phoneNumber: '', clerks: res });
                });
        }, 1500);


    }

    showCreateUserButton=()=>{
        if(localStorage.getItem(USER_ROLE)=='ROLE_ADMIN'){
        return <Button style={{ padding: '10px', background: '#1890ff', color: 'white', marginTop: '10px', marginLeft: '10px', marginBottom: '10px' }} onClick={this.showModal}>New</Button>
        }else{
            return <div></div>
        }
    }

    render() {
        const Search = Input.Search;
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }];


        return (

            <div>
                <Paper>
                    {this.showCreateUserButton()}
                    <Search style={{ width: 200, float: 'right', marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}
                        placeholder="Search"
                        onSearch={value => this.searchByName(value)}
                        enterButton
                    />
                    <Table dataSource={this.state.clerks} columns={columns}
                        expandedRowRender={
                            record =>
                                <Transfer
                                    onClick={this.findAllLots(record.id)}
                                    dataSource={allLots} //left
                                    targetKeys={targetKeys} //right
                                    showSearch
                                    titles={['Available Parking Lot', 'Parking Lot under management']}
                                    filterOption={this.filterOption}
                                    onSelectChange={this.handleSelectChange}
                                    onChange={this.handleChange}
                                    onSearch={this.handleSearch}
                                    render={item => item.title}
                                />
                        }
                        rowKey="id"
                    >
                    </Table>
                    {/* Creation Modal */}
                    <Modal
                        visible={this.state.visible}
                        title={<span><h2>Register new parking clerk</h2></span>}
                        title={<span><h2>Register new parking clerk</h2></span>}
                        onOk={this.submitRequest}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                            <Button key="submit" type="primary" onClick={this.submitRequest}>
                                Confirm
                    </Button>,
                        ]}
                    >
                        <form noValidate autoComplete="off">

                            <div>
                                <TextField
                                    id="standard-name"
                                    label="Name"
                                    value={this.state.name}
                                    onChange={this.handleFieldChange('name')}
                                    margin="normal"
                                />
                            </div>

                            <div>
                                <TextField
                                    id="standard-email"
                                    label="Email"
                                    value={this.state.email}
                                    onChange={this.handleFieldChange('email')}
                                    margin="normal"
                                />
                            </div>

                            <div>
                                <TextField
                                    id="standard-phoneNumber"
                                    label="Phone Number"
                                    value={this.state.phoneNumber}
                                    onChange={this.handleFieldChange('phoneNumber')}
                                    margin="normal"
                                />
                            </div>

                        </form>
                    </Modal>
                </Paper>

            </div>



        )
    }
}
