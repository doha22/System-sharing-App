
import React, { Component } from 'react';
import axios from 'axios';
import 'mdbreact/dist/css/mdb.css' ;
//import { useHistory } from "react-router-dom";
//import { withRouter } from 'react-router-dom';
//import {Redirect} from 'react-router-dom';
//import { Link } from 'react-router-dom';

//import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css';
import {MDBRow,  MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody} from 'mdbreact';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this)

       
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // this.onSubmitLogin = this.onSubmitLogin.bind(this);

        this.state = {
            email : '',
            password: ''
        }
    }

// to redirect to anther page 
    // history = useHistory();

     routeChange = () =>{ 
    
    this.props.history.push("/list_upload_info");
  }

    onChangeEmail(e) {
        this.setState({ 
            email: e.target.value 
        })
    }

    onChangePassword(e) {
        this.setState({ 
            password: e.target.value 
        })
    }


    onSubmit(e) {
        e.preventDefault()
        const result = {
               email: this.state.email,
               password : this.state.password
 
             }
         

        axios.post("http://localhost:8888/login", (result)) 
        .then(
          res => {
            console.log(res);
        })
    }



    render() {
        return (

          <MDBRow className="card_s">
             <MDBCol md="7"></MDBCol>
   
        <MDBCol md="4">
          <MDBCard className="card_l">
         
            <MDBCardBody>
              <form onSubmit={this.onSubmit} action="/" method="post">
                <p className="h4 text-center ">Login</p>
                <div className="grey-text">
                 
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                   
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
            
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                  
                    type="password"
                    validate
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                </div>
               
               
                <div className="text-center ">
                 
<MDBBtn color="primary" 
               onClick={this.routeChange}
                  >
                  Login
                  </MDBBtn>
             

                </div>
                
              
              
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </MDBRow>
 );
}
}

// export default FormPage;
