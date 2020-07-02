import React, { Component } from 'react';
import axios from 'axios';

export default class FilesUploadComponent extends Component {

    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangecategory_name = this.onChangecategory_name.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category_name : '',
            description : '',
            profileImg:null
        }
    }

    onChangecategory_name(e) {
        this.setState({ 
            category_name: e.target.value 
        })
    }

    onChangeDescription(e) {
        this.setState({ 
            description: e.target.value 
        })
    }

    onFileChange(e) {
        this.setState({ 
            profileImg: e.target.files[0] ,
            loaded: 0,
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const data = new FormData() 
       // data.append('file', this.state.profileImg)

        const result = {
            category_name : this.state.category_name ,
               description: this.state.description,
               profileImg :  data.append('file', this.state.profileImg)
 
             }

      //  const formData = new FormData()
      //  formData.append('profileImg', result)

   
        axios.post("http://localhost:8888/uploads/uploadFile", (result)) 
        .then(res => {
            console.log(res)
        })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit} action="/" method="post" encType="multipart/form-data">

                    <div className="form-group"> 
            <label>Category: </label>
            <input  type="text" name="category_name"  className="form-control" value={this.state.category_name}  required
 onChange={this.onChangecategory_name} />
          </div>

          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text" name="description"  className="form-control" value={this.state.description}  required
 onChange={this.onChangeDescription} />
          </div>

                        <div className="form-group">
                            <label> Upload file</label>
                            <input type="file" name="profileImg" onChange={this.onFileChange}  />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}