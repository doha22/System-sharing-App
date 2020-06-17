import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';

export default class CreateMaterial extends Component {

    // in constructor , declear all variables 
    constructor(props) {
        super(props);


        // to be sure this is refering to the right one
        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeUploading_date = this.onChangeUploading_date.bind(this);

        // this.onChangeUpload_file = this.onChangeUpload_file.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        // to declear variable in react 
        this.state = {
          
            // username: '',
            description: '',
            uploading_date: new Date(),
            // file: null ,
            //categories:[],
           // users: ''  // many users , as user is selected from dropdown list 
          }
      

        } // end of constructor

          // will work before anything of the page

          
          // here we need get the data from db to be in dropdown list menu
    //      componentDidMount() {
    // axios.get('http://localhost:8000/users/')
    // .then(response => {
    //     //   means checking for at least one user to the db 
    //     if (response.data.length >= 0) {
    //       this.setState({
    //         //   using map to return every element in array 
    //         // user => user.username  ,  to return only username from json obj in db

    //        categories: response.data.map(user => user.category),
    //         // get first element in array 
    //         category: response.data[10].category
    //       })
    //     }
    // }) 
    // // if error
    // .catch((error) => {
    //     console.log(error);
    //   })

    // }
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
          
          onChangeCategory(e) {
            this.setState({
              category : e.target.value
            });
          }
        //   onChangeUpload_file(e) {
        //     this.setState({
        //         file:e.target.files
        //     });
        // }

          onSubmit(e) {
            e.preventDefault();
        
// about file
    // const formData = new FormData();
    //   formData.append('myfile',this.state.file);

            const result = {
           //   username: this.state.username,
              description: this.state.description,
              // file : formData ,
            //  category:this.state.category ,
              date: this.state.date

            }

            // const config = {
            //     headers: {
            //         'content-type': 'multipart/form-data'
            //     }
            // };
            console.log(result);

 // send data to backend through axiox which send http request 
 axios.post('http://localhost:8000/materials/add', (result.date,result.description) )
 .then(res => console.log(res.data));


 


            //as render when submit is done , here the front end reflects to backend
            window.location = "/"

    }




   

render() {
    return(
        <div>
        <h3>Upload New Material</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-group"> 
            <label>Auther Name: </label>
{/* 
            <input  type="text"  className="form-control" value={this.state.username}  required
 onChange={this.onChangeUsername} /> */}

          </div>

          <div className="form-group"> 
            <label>Category: </label>

            {/* dropdown list of categories 
            <select useref="CategoryInput" className="form-control"  value={this.state.category} required
onChange={this.onChangeCategory}>

                {
                    //  which get all users from db and return data for each element in array 
                  this.state.categories.map(function(user) {
                    return <option key={user} value={user}>
                        {user}
                      </option>;
                  })
                }
            </select> */}


          </div>
        {/* <div >
        <ol useref="CategoryInput"  value={this.state.category} required
onChange={this.onChangeCategory}>
        {this.state.categories.map((user, i) => (
          <li key={i}>{user}</li>
        )) }

      </ol>

        </div> */}
 
    


          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"  className="form-control" value={this.state.description}  required
 onChange={this.onChangeDescription} />
          </div>


{/* uplaod file  */}
{/* <div className="form-group"> 
            <label>Upload Material: </label>
            <input  type="file"  className="form-control" value={this.state.file} onChange={this.onChangeUpload_file}  required
 />
          </div>

{/* to test */}


          <div className="form-group">
            <label>Date: </label>
            <div>

            {/* DatePicker is date component in react  */}

              <DatePicker selected={this.state.uploading_date} onChange={this.onChangeUploading_date} />
            </div>
          </div>
  
          <div className="form-group">
            <input type="submit" value="Create " className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
}
}
