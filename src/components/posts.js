import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

//import { Redirect } from 'react-router-dom';

export default class Posts extends Component {

    constructor(props) {
        super(props);

        this.onChangeSelectTitle = this.onChangeSelectTitle.bind(this)

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

    onChangeSelectTitle(e){
      this.setState({
        title :e.target.value 
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

        <div className="card">
        <form onSubmit={this.onSubmit} action="/" method="post">
  <div className="card-header">
  
  </div>
  
  <div className="card-body">
  <label>Title :</label>  

{/* <input  type="text" name="title"  className="form-control"  onChange={this.onChangeTitle} value={this.state.title}  required></input> */}
<select name="title" className="form-control" onChange={this.onChangeSelectTitle}  >
    <option value="N/A">N/A</option>
    <option value="Html">Html</option>
    <option value="Css">Css</option>
    <option value="Js">Js</option>
    <option value="Nodejs">Nodejs</option>
    <option value="Java">Java</option>
    <option value="C++">C++</option>
    <option value="C#">C#</option>
    <option value="Go">Go</option>
    <option value="Reactjs">Reactjs</option>
    <option value="Angular">Angular</option>
    <option value="Machine learning">Machine learning</option>
    <option value="Deap learning">Deap learning</option>
    <option value="Nlp">Nlp</option>
    <option value="Nlp">Automation</option>
    <option value="Nlp">Network</option>
    <option value="Nlp">Others</option>
</select>
{/* {this.state.title} */}

    <h5 className="card-title">Create your Question</h5>
    
    <p className="card-text">
    <input  type="text" name="question"  onChange={this.onChangeQustion}  className="form-control" value={this.state.question}  required></input>
    </p>
    
   <button className="btn btn-primary post_btn" type="submit">Post</button>
  
  </div>
  </form>

</div>


<br></br>
<p>Note: You Can see others questions and answers on selected title</p>
<Link to="/view_question" >Show</Link>



        </div>
        <div className="col-md-2"></div> 
    {/* </div> */}
</div>


 );
}
}