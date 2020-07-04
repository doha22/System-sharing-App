import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

export default class Questions extends Component {

    constructor(props) {
        super(props);
        // this.routeChange = this.routeChange.bind(this)

      
     //   this.props.history.push('/view_comments', renderQuestions())
     
        this.onChangetext = this.onChangetext.bind(this);
        this.onChangeSelectTitle = this.onChangeSelectTitle.bind(this)
        this.onSubmit = this.onSubmit.bind(this);


   

        this.state = {
            question:'',
            title : '',

           // username : sessionStorage.getItem('username'),
            text: '' ,
           questions:[]  , // empty array
            id : sessionStorage.getItem('id')  ,
           
        }
    }

    onChangetext(e) {
        this.setState({ 
            text: e.target.value 
        })
    }

    onChangeSelectTitle(e){
        this.setState({ 
            title: e.target.value 

        }) 
    }
    


// get all questions depend on selected title 

//componentDidMount(){
 
    onSubmit(e) {
        e.preventDefault()

    axios.get("http://localhost:8888/allCat/"+this.state.title) 
    .then(
      response => {
        this.setState({ 
        questions: response.data ,
       })
        console.log(response.data.question)
        console.log(sessionStorage.getItem('username'));
    })

    


}
    ////////////////////////////////////////////////////////


// to list the others questions

  renderQuestions() {
 //  let Q_id =''
    return this.state.questions.map(item => {
       
      return (
        <tr key={item._id}>   
          {/* <td>{item.username}</td> */}
          <td>
              {/* passing data in link */}
          <Link
           to={
               { pathname:"/view_comments" , Q_id : item._id
      }
    }
      >
              <h5>{item.question}</h5>
              </Link>  
              </td>
               


      <td>id { item._id} 
      </td>
         
        </tr>
      
      );
     
    })
  }


  
  

    render() {
        return (
        
<div className="row">


    {/* <div className="container"> */}
    
         <div className="col-md-2"></div> 
        <div className="col-md-8">
       
        <form  action="/" method="post" onSubmit={this.onSubmit}>

    <select value={this.state.title} name="title" className="form-control"  onChange={this.onChangeSelectTitle}  >
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
<h3>Title : {this.state.title}</h3> 
<button className="btn btn-primary post_btn" type="submit">Show</button>

</form>
        <br></br>
        <table className="table">
          <tbody>
         
         {this.renderQuestions()} 
         
          </tbody>
        </table>

<br></br>


   



 

        </div>
        <div className="col-md-2"></div> 
    {/* </div> */}
</div>


 );
}
}