import React from 'react';
import './App.css';
// react-router-dom ----> used in routing between different component with differet url
import { BrowserRouter as Router ,Route} from "react-router-dom";
//import { Switch } from 'react-router-dom';

import Navbar from "./components/navbar" ;
import Footer from "./components/footer" ;
//import CreateMaterial from "./components/add_material";
//import EditMaterial from "./components/edit_material";
//import MaterialList from "./components/list_materials";
// import CreateUser from "./components/create_user";

import Register from "./components/register" ;
import Login from "./components/login";
import FilesUploadComponent from "./components/file_upload_add" ;

import Posts from "./components/posts";
import Comments from "./components/comments" ;

import Profile from "./components/user_profile";

import MaterialList from "./components/home";
//import materialList from './components/home';

function App() {
  return (
    <Router>
       {/* <App> */}
      {/* <Switch> */}
      <div className="container-fluid">
        {/* <div className="row"> */}
 {/* <Navbar /> */}
       
      <Route exact path="/"  component={Register} />
      </div>

      <Route path="/login"  component={Login} />
      {/* </div> */}
   
      
      <div className="container-fluid">
    
     
    <div className="container">
  


  {/* Route used to make path for each component */}
{/* <Route path="/" exact component={MaterialList} />
<Route path="/edit/:id"  component={EditMaterial} />
<Route path="/create"  component={CreateMaterial} /> */}
{/* <Route path="/user"  component={CreateUser} /> */}
<Navbar />
<Route path="/upload_info"  component={FilesUploadComponent} />

    </div>

<div className="container">
<Route path="/list_upload_info"  component={MaterialList} />

<Route path="/create_post" component={Posts} />
<Route path="/view_comments" component={Comments} />

<Route path="/view_profile" component={Profile} />




</div>

    <Footer />
    </div>
    {/* </Switch> */}
    {/* </App> */}
    </Router>
  );
}

export default App;
