import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// component 1
// function component
const Material = props => (
    <tr>
      <td>{props.material.username}</td>
      <td>{props.material.description}</td>
      {/* substring(0,10) ,  cause the date is timezone */}
      <td>{props.material.uploading_date.substring(0,10)}</td>
      
      
      <td>
       <button> <Link to={"/edit/"+props.material._id}>edit</Link> </button>
        </td>
        <td>
        <button onClick={() => { props.deleteMaterial(props.material._id) }}> delete </button>
        </td>
     
    </tr>
  )
  

// component 2 
// class component
export default class MaterialList extends Component {

    constructor(props) {
        super(props);
    
        // to delete by using button
        this.deleteMaterial = this.deleteMaterial.bind(this)
    
        // be empty array of material
        this.state = {materials: []};
      }

// to get the list of data from db by using get method
componentDidMount() {
    axios.get('http://localhost:8000/materials/')
      .then(response => {
        this.setState({ materials: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // delete material by id as record deleted by id in db
  deleteMaterial(id) {
    axios.delete('http://localhost:8000/materials/'+id)
      .then(response => { console.log(response.data)});

      // means will check for every id in the marterial array not equal to id of delete fn , it will be deleted 
   // _id means id which stored in mongo db is like that 

      this.setState({
      materials: this.state.materials.filter(el => el._id !== id)
    })
  }


  // that will be shown in table 
  materialList() {
      // will return every element in array
    return this.state.materials.map(currentfile => {
// call the material component and this component will be row in array
// mt is variable name 

// return the componet fn from above
      return <Material material={currentfile} deleteMaterial={this.deleteMaterial} key={currentfile._id}/>;
    })
  }

render(){
    return(
          <div>
        <h3>Material List </h3> <br></br>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Auther Name</th>
              <th>Description</th>
              <th>Uploade Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { this.materialList() }
          </tbody>
        </table>
      </div>
    )
}
}