import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
//import { Redirect } from 'react-router-dom';

export default class Posts extends Component {

    constructor(props) {
        super(props);
         this.routeChange = this.routeChange.bind(this)

       
        this.onChangeQustion = this.onChangeQustion.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // this.onSubmitLogin = this.onSubmitLogin.bind(this);

        this.state = {
            title : '',
            question: '' 
           
        }
    }


// to redirect to anther page 
   
     routeChange = () =>{ 
    
    this.props.history.push("/view_comments");
  }

    onChangeTitle(e) {
        this.setState({ 
            title: e.target.value 
        })
    }

    onChangeQustion(e) {
        this.setState({ 
            question: e.target.value 
        })
    }


    onSubmit(e) {
        e.preventDefault()
        const result = {
               title: this.state.title,
               question : this.state.question
 
             }
         

        axios.post("http://localhost:8888/create_blog", (result)) 
        .then(
          res => {
            console.log(res.data);
       
        sessionStorage.setItem('id',res.data.data.result._id);
        sessionStorage.setItem('title',res.data.data.result.title);


      console.log(sessionStorage.getItem('id'))  ;
      this.routeChange();
            
        })
      
    }



    render() {
        return (
        
<div className="row">

    {/* <div className="container"> */}
    
         <div className="col-md-2"></div> 
        <div className="col-md-8">

       



                 {/* Search form  */}
                 <form className="form-inline d-flex justify-content-center md-form form-sm active-pink-2 mt-2">
      <input className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
        aria-label="Search" />
      <i className="fas fa-search" aria-hidden="true"></i>
    </form>
    





        <div className="card">
        <form onSubmit={this.onSubmit} action="/" method="post">
  <div className="card-header">
  
  </div>
  
  <div className="card-body">
  <label>Title :</label>  

<input  type="text" name="title"  className="form-control"  onChange={this.onChangeTitle} value={this.state.title}  required></input>

    <h5 className="card-title">Create your Question</h5>
    
    <p className="card-text">
    <input  type="text" name="question"  onChange={this.onChangeQustion}  className="form-control" value={this.state.question}  required></input>


    </p>
    
   <button className="btn btn-primary post_btn" type="submit">Post</button>
   
  </div>
  </form>

</div>


<br></br>



        </div>
        <div className="col-md-2"></div> 
    {/* </div> */}
</div>


 );
}
}