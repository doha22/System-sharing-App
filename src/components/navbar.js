import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/list_upload_info" className="navbar-brand">View Materials</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          
          {/* <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li> */}
          <li className="navbar-item">
          <Link to="/upload_info" className="nav-link">Upload File</Link>
          </li>
          
        </ul>
        </div>
      </nav>
    );
  }
}