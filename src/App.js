import React from 'react';
import './App.css';
// react-router-dom ----> used in routing between different component with differet url
import { BrowserRouter as Router ,Route} from "react-router-dom";

import Navbar from "./components/navbar" ;
import Footer from "./components/footer" ;
import CreateMaterial from "./components/add_material";
import EditMaterial from "./components/edit_material";
import MaterialList from "./components/list_materials";
// import CreateUser from "./components/create_user";

function App() {
  return (
    <Router>
      <div className="container-fluid">
   
     <Navbar />
     
    <div className="container">

  {/* Route used to make path for each component */}
<Route path="/" exact component={MaterialList} />
<Route path="/edit/:id"  component={EditMaterial} />
<Route path="/create"  component={CreateMaterial} />
{/* <Route path="/user"  component={CreateUser} /> */}


    </div>

    <Footer />
    </div>
  
    </Router>
  );
}

export default App;
