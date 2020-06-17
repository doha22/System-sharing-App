import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

 // in constructor , declear all variables 
 constructor(props) {
    super(props);


    // to be sure this is refering to the right one
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // to declear variable in react 
    this.state = {
        username: '' , 
        category:''
      }
  

    } // end of constructor

// to update the username in the state (the above declearation) when change value of username
onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username ,
      category : this.state.category
    }

    console.log(user);

    // send data to backend through axiox which send http request 
    axios.post('http://localhost:8000/users/add', user)
    .then(res => console.log(res.data));


    //when submit is done , get username blank
    this.setState({
        username: '' ,
        category : ''
      })
  
}


render(){
    return(
        <div>
        <h3>Create New User</h3> <br></br>
        <form onSubmit={this.onSubmit}>

          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername}  required />
          </div>

          <div className="form-group"> 
            <label>Category Name: </label>
            <input  type="text" className="form-control" value={this.state.category} onChange={this.onChangeCategory}  required />
          </div>

          <div className="form-group">
            <input type="submit" value="Create" className="btn btn-primary" />
          </div>

        </form>
      </div>
    )
}
}