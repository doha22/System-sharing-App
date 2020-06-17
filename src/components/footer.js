import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

export default class Footer extends Component {

  render() {
    return (
       <footer>
          <div className="footer-copyright text-center py-3">
        {/* <MDBContainer fluid> */}
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        {/* </MDBContainer> */}
      </div>
       </footer>
     
    );
  }
}