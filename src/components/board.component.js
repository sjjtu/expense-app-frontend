import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReadOnlyRows from "./read-only-rows.component";
import EditableRows from './editable-rows.component';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.board_id = props.id.id;
        this.createNewRecord = this.createNewRecord.bind(this);
        this.usersList = [];
        this.state = {
            records: [],
            name: "",
            description: "",
            users: [],
            categories: [],
            isAddable: true
        };

        this.handleOnEdit = this.handleOnEdit.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);

    }

    componentDidMount() {
        axios.get(process.env.react_app_backend_url+"/boards/"+this.board_id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    records: res.data.records,
                    name: res.data.name,
                    description: res.data.description,
                    users: res.data.users,
                    categories: res.data.categories
                })
            })
            .catch((error) => {
                    console.log(error);
             });
        axios.get(process.env.react_app_backend_url+"/users/")
             .then(res => {
                this.usersList = res.data.map(user => user.name);

             })
    }

    recordsList() {
        console.log(this.usersList)
        return this.state.records.map(currentRecord => {
            if("_editable" in currentRecord){

                return <EditableRows 
                            inputs={currentRecord}
                            attrList={["amount", "description", "category", "user", "date"]}
                            usersList={this.usersList}
                            id={currentRecord._id} 
                            key={currentRecord._id}
                            handleOnSave={this.handleOnSave}
                            catList={this.state.categories}>    
                            
                        </EditableRows>
            }
            else {
                return <ReadOnlyRows 
                            inputs={currentRecord} 
                            attrList={["amount", "description", "category", "user", "date"]}
                            handleOnEdit={this.handleOnEdit}
                            id={currentRecord._id}
                            handleOnDelete={this.handleOnDelete}
                            key={currentRecord._id}>
                        </ReadOnlyRows>;
            }
        })
    }

    createNewRecord() {
        if(this.state.isAddable===false){
            alert("could not create new record")
        }
        else {
            const newrecords = this.state.records.concat([{"amount":"", "description":"", "category":"", "user":[], "date":"", "_id":"temp", "_editable":true}]);
            this.setState({records: newrecords, isAddable: false});
            console.log("add record button pushed")
        }
        
    }

    handleOnEdit(id) {
        const records_map = new Map(this.state.records.map(obj => [obj._id, obj]));
        const editing_record =  records_map.get(id);
        editing_record["_editable"] = true;

        // console.log(Array.from(records_map.values()  ));

        this.setState({records: Array.from(records_map.values())});
    }

    handleOnSave(id, data) {
        const POST_URL = id==="temp" ? `${process.env.react_app_backend_url}/boards/${this.board_id}/createRecord` : `${process.env.react_app_backend_url}/boards/${this.board_id}/${id}/update`;
        console.log(data)
        axios.post(POST_URL, data)
            .then(res => {
                console.log(res.data);
                this.componentDidMount()
            })
            .catch((error) => {
                console.log(error);
                return(<div class="alert alert-primary" role="alert">alert</div>)
            })
    }

    handleOnDelete(id) {
        const DELETE_URL = `${process.env.react_app_backend_url}/boards/${this.board_id}/${id}`

        axios.delete(DELETE_URL)
            .then(res => {
                this.componentDidMount()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
            <h3>Board: {this.state.name}</h3>
            <p>{this.state.description}</p>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>User</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                { this.recordsList() }
            </tbody>
            </table>
            <button className='addRow' onClick={this.createNewRecord}>Add</button>
            
      </div>
        );
    }
}
