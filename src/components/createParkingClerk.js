import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class createParkingClerk extends React.Component {
  state = {
    name: '',
    email: '',
    phoneNumber: '',
    status: 'available',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  submitRequest = ()=>{
	  fetch("https://parkingsystem.herokuapp.com/parkingclerks/", 
	  {method: 'POST', headers: new Headers({
    'Content-Type': 'application/json'
  }), mode: 'cors', 
  body: JSON.stringify({name: this.state.name, 
  email: this.state.email,
  phoneNumber: this.state.phoneNumber,
  status: this.state.status})})
  .then(res => res.json()).then(res => console.log(res))
  alert("Create Parking Clerk Successfully")}

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
      <span><h2>新建停車員</h2></span>
        <TextField
          id="standard-name"
          label="姓名"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
		<TextField
          id="standard-email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
        />
		<TextField
          id="standard-phoneNumber"
          label="電話號碼"
          className={classes.textField}
          value={this.state.phoneNumber}
          onChange={this.handleChange('phoneNumber')}
          margin="normal"
        />
      <Button style={{background: '#1890ff', color: 'white'}} variant="contained" color="primary" className={classes.button} onClick={this.submitRequest}>
      提交
      </Button>
	  
      </form>
    );
  }
}

createParkingClerk.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(createParkingClerk);