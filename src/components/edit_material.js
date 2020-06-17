import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';

export default class EditMaterial extends Component {

    // in constructor , declear all variables 
    constructor(props) {
        super(props);


        // to be sure this is refering to the right one
        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUploading_date = this.onChangeUploading_date.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // to declear variable in react 
        this.state = {
            // username: '',
            description: '',
            uploading_date:new Date(),
            // users: []  // many users , as user is selected from dropdown list 
          }
      

        } // end of constructor

          // will work before anything of the page

          
          // here we need get the data from db to be in dropdown list menu
         componentDidMount() {

            axios.get('http://localhost:8000/materials/'+this.props.match.params.id)
            .then(response => {
              this.setState({
             //   username: response.data.username,
                description: response.data.description,
                uploading_date: new Date(response.uploading_date.date)
              })   
            })
            .catch(function (error) {
              console.log(error);
            })




    // axios.get('http://localhost:8000/users/')
    // .then(response => {
    //     //   means checking for at least one user to the db 
    //     if (response.data.length > 0) {
    //       this.setState({
    //         //   using map to return every element in array 
    //         // user => user.username  ,  to return only username from json obj in db
    //       // username: response.data.username,
    //         users: response.data.map(user => user.username)
            
    //       })
    //     }
    // }) 
    // // if error
    // .catch((error) => {
    //     console.log(error);
    //   })

     }
        // to update the username in the state (the above declearation) when change value of username
        // onChangeUsername(e) {
        //     this.setState({
        //       username: e.target.value
        //     });
        //   }
        
          onChangeDescription(e) {
            this.setState({
                description: e.target.value
            })
          }

          onChangeUploading_date(date) {
            this.setState({
                uploading_date : date 
            });
          }

          onSubmit(e) {
            e.preventDefault();
        
            const result = {
              // username: this.state.username,
              description: this.state.description,
              uploading_date: this.state.uploading_date
            }
        
            console.log(result);

 // send data to backend through axiox which send http request 
 axios.post('http://localhost:8000/materials/edit'+this.props.match.params.id, result)
 .then(res => console.log(res.data));


            //as render when submit is done , here the front end reflects to backend
            window.location = "/"
    }




   

render() {
    return(
        <div>
        <h3>Update  Material</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-group"> 
            <label>Auther Name: </label>

            {/* dropdown list of users  */}
            {/* <select ref="userInput" className="form-control"  value={this.state.username} required
onChange={this.onChangeUsername}>

                {
                    //  which get all users from db and return data for each element in array 
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select> */}

          </div>



          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"  className="form-control" value={this.state.description}  required
 onChange={this.onChangeDescription} />
          </div>


{/* uplaod file  */}



          <div className="form-group">
            <label>Date: </label>
            <div>

            {/* DatePicker is date component in react  */}

              <DatePicker selected={this.state.uploading_date} onChange={this.onChangeUploading_date} />
            </div>
          </div>
  
          <div className="form-group">
            <input type="submit" value="Edit " className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
}
}
