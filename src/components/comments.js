import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
//import { Link } from 'react-router-dom';

export default class Comments extends Component {

    constructor(props) {
        super(props);
        // this.routeChange = this.routeChange.bind(this)

        this.onChangetext = this.onChangetext.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            question:'',
            title : '',
           // username : sessionStorage.getItem('username'),
            text: '' ,
           replies:[]  , // empty array
            id : sessionStorage.getItem('id') 
        }
    }

    onChangetext(e) {
        this.setState({ 
            text: e.target.value 
        })
    }

    


// get the user question & title

componentDidMount(){
// id from creating post
    axios.get("http://localhost:8888/category/"+this.state.id) 
    .then(
      response => {
        this.setState({ title: response.data.title,
        question: response.data.question ,
       })
        console.log(response.data.title)
        console.log(sessionStorage.getItem('username'));
    })

    // see other comments 

    axios.get('http://localhost:8888/category/'+this.state.id)
      .then(response => {
        
        this.setState({ replies: response.data.comments })
        console.log("comments  :"+response.data.comments)
       
      })
      .catch((error) => {
        console.log(error);
      })


}
    ////////////////////////////////////////////////////////

// when reply with comment
    onSubmit(e) {
        e.preventDefault()
        const com = {
               text : this.state.text,
               username : sessionStorage.getItem('username') ,
               createdAt:Date.now()
 
             }
        axios.post("http://localhost:8888/category/"+this.state.id ,(com) ) 
        .then(
          res => {
            console.log("reply done");
            console.log(res.data);
            // clear comment field after submitting
            this.setState({
              text: ''
            });
        })

    }

    ////////////////////////////////////////////////////

// to list the others comments
  rendercomments() {
    return this.state.replies.map(item => {
      return (
        <tr key={item._id}>
          
          <td>{item.username}</td>
          <td>{item.text}</td>
         
        </tr>
      );
           
  
    })
  }

    render() {
    
      // if (this.state.replies.length){ 
      //   var renderItems= Object.keys(this.state.replies).map(function(item, i) {
      //     return (<tr key={i}>
      //       <td>{item.comments}</td>
      //     {/* <td>{item.description}</td> */}
      //       {/* <td></td> */}
      //     </tr>)
      //    });
      //  // } 
      // }
       
      
      //  console.log("show items :"+renderItems)


        return (
        
<div className="row">


    {/* <div className="container"> */}
    
         <div className="col-md-2"></div> 
        <div className="col-md-8">

     

{/* comments */}
<div className="card">
  <form  method="get">
  <div className="card-body">
    <blockquote className="blockquote mb-0">

<label> Title :  {this.state.title}</label>
{/* <textarea type="text" name="question"  className="form-control" value={this.state.question}></textarea> */}
  <p> {this.state.question}</p>
    </blockquote>
  </div>

  </form>
</div>



<br></br>
<p>comments</p>

        <div className="card">
        <form onSubmit={this.onSubmit} action="/" method="post">
  <div className="card-header">
  
  </div>
  
  <div className="card-body">
  
    
    <p className="card-text">
    <textarea  type="text" name="text"  className="form-control"  onChange={this.onChangetext}  value={this.state.text}   required></textarea>


    </p>
       
  </div>


<p>
<button className="btn btn-primary" type="submit" >Reply</button>
</p>
  </form>

 


</div>


    <table className="table">
          <tbody>
          {/* {this.renderProducts()} */}
          {this.rendercomments()}
          {/* {renderItems} */}
          </tbody>
        </table>

{/* display comment after submitting */}
{/* <div className="card">

<div className="card-body">
  
  <div className="card-text">

<blockquote className="blockquote mb-0">

    </blockquote>
  </div>
</div>
</div> */}

 

        </div>
        <div className="col-md-2"></div> 
    {/* </div> */}
</div>


 );
}
}