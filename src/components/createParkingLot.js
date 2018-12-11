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


class createParkingLot extends React.Component {
  state = {
    name: '',
    capacity: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  submitRequest = ()=>{
	  fetch("https://parkingsystem.herokuapp.com/parkinglots/", 
	  {method: 'POST', headers: new Headers({
    'Content-Type': 'application/json'
  }), mode: 'cors', 
  body: JSON.stringify({name: this.state.name, 
  capacity: this.state.capacity,})})
  .then(res => res.json()).then(res => console.log(res))
  alert("Create Parking Lot Successfully")}

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
      <span><h2>新建停車場</h2></span>
        <TextField
          id="standard-name"
          label="名字"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
		<TextField
          id="standard-capacity"
          label="大小"
          className={classes.textField}
          value={this.state.capacity}
          onChange={this.handleChange('capacity')}
          margin="normal"
        />
      <Button style={{background: '#1890ff', color: 'white'}}  variant="contained" color="primary" className={classes.button} onClick={this.submitRequest}>
      提交
      </Button>
	  
      </form>
    );
  }
}

createParkingLot.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(createParkingLot);