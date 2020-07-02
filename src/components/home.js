import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import ReactDOM from 'react-dom';

// anther component
const Material = props => (
  <tr>
 
    <td>{props.value.description}</td>
    <td>{props.value.category_name}</td>
   <td>uploaded file here </td>
   <td>
       <button> <Link to={"/edit/"+props.value._id}>edit</Link> </button>
        </td>
        <td>
        <button onClick={() => { props.deleteMaterial(props.value._id) }}> delete </button>
        </td>
  </tr>
);

// class component
export default class MaterialList extends Component {
  constructor(props) {
    super(props);
    //const users = [];
    this.deleteMaterial = this.deleteMaterial.bind(this)

     this.state = {users: []};
  
  }

  // to get the list of data from db by using get method
  componentDidMount() {

    axios.get('http://localhost:8888/uploads/list_upload_info')
      .then(response => {
        
        this.setState({ users: response.data.users })
       
       
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMaterial(id) {
    axios.delete('http://localhost:8888/uploads/list_upload_info'+id)
      .then(response => { console.log(response.data.users)});
// once delete , then delete from table shown
    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  //that will be shown in table 
 // var { users = [] } = this.props;
 
  //  materialList() {
  //   // using map to redirect every element in array
  //   // then return component , this component will be passing data to tableby using 
  //  // 2 props
   
    
  //   return  (this.state.users).map( currentfile => {
  
  //    // return <Material value={currentfile} deleteMaterial={this.deleteMaterial} key={currentfile._id}/>;
  //   return (<tr><th>{currentfile.category_name}</th>
  //   <th>{currentfile.description}</th></tr>)
  //   })

 
//}

// renderProducts() {
//   return this.state.users.map(product => {
//     return (
//       <tr key={product._id}>
//         <td>{product._id}</td>
//         <td>{product.category_name}</td>
//         <td>{product.description}</td>
//       </tr>
//     );
//   })
// }


renderProducts() {
  return this.state.users.map(item => {
    // return (
    //   <tr key={item._id}>
    //     <td>{item.category_name}</td>
    //     <td>{item.description}</td>
     
    //   </tr>
    // );
          return <Material value={item} deleteMaterial={this.deleteMaterial} key={item._id}/>;

  })
}


  render() {
    //let renderItems = []
      if (this.state.users.length){ 
      var renderItems= Object.keys(this.state.users).map(function(item, i) {
        return (<tr key={i}>
          <td>{item.category_name}</td>
        <td>{item.description}</td>
          {/* <td></td> */}
        </tr>)
       });
     // } 
    }
     
    
     console.log("show items :"+renderItems)


    return (
  
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Category </th>
              <th>Description</th>
              
              <th>Uploads </th>
              <th>Edit</th>
              <th> Delete</th>
            </tr>
          </thead>
          <tbody>
          {/* {this.renderProducts()} */}
          {this.renderProducts()}
          {/* {renderItems} */}
          </tbody>
        </table>
      </div>
    )
  }
}

