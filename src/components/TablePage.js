import React, { Component } from 'react'
  
export default class TablePage extends Component {
  state={abc:'',age:''}
  getAllTodo=()=>{
    fetch("https://parkingsystem.herokuapp.com/employees/abc", {
            method: 'GET', 
            mode: 'cors',
        }).then(res => res.json())
        .then(res => {
          this.setState({abc:res.name})
          this.setState({age:res.age})
        })
  }
  render() {
    return (
      <div>
         <p>{this.state.abc}</p>
         <p>{this.state.age}</p>
         <button onClick={this.getAllTodo}>click</button>
      </div>
    )
  }
}
