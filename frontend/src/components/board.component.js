import React, { Component, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReadOnlyRows from "./read-only-rows.component";
import EditableRows from './editable-rows.component';

const example_list = [{amount: 123, description: "ficitonal record", category: "cat", user: [], date: "2022-07-12", _id:"a12312d21d"}]

const Record = props => {
    return(
        <tr>
            <td> {props.record.amount}</td>
            <td>{props.record.description}</td>
            <td>{props.record.category}</td>
            <td>{props.record.users}</td>
            <td>{props.record.date}</td>
        </tr>
    )
}

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.board_id = props.id.id;
        this.createNewRecord = this.createNewRecord.bind(this);
        this.state = {
            records: [],
            name: "",
            description: "",
            users: []
        };

        this.handleOnEdit = this.handleOnEdit.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);

    }

    componentDidMount() {
        this.setState({records: example_list});
        axios.get("http://localhost:5000/boards/"+this.board_id)
            .then(res => {
                console.log(res.data);
                this.setState(res.data)
            })
            .catch((error) => {
                    console.log(error);
             });
    }

    recordsList() {
        return this.state.records.map(currentRecord => {
            if("_editable" in currentRecord)
                return <EditableRows 
                            inputs={currentRecord}
                            id={currentRecord._id} 
                            key={currentRecord._id}
                            handleOnSave={this.handleOnSave}
                            link="">    
                        </EditableRows>
                
            else {
                return <ReadOnlyRows 
                            inputs={currentRecord} 
                            handleOnEdit={this.handleOnEdit}
                            id={currentRecord._id}
                            key={currentRecord._id} 
                            link="">
                        </ReadOnlyRows>;
            }
        })
    }

    createNewRecord() {
        const newrecords = this.state.records.concat([{"amount":"", "description":"", "category":"", "users":[], "date":"", "_id":"temp", "_editable":true}]);
        this.setState({records: newrecords});
    }

    handleOnEdit(id) {
        const records_map = new Map(this.state.records.map(obj => [obj._id, obj]));
        const editing_record =  records_map.get(id);
        editing_record["_editable"] = true;

        // console.log(Array.from(records_map.values()  ));

        this.setState({boards: Array.from(records_map.values())})
    }

    handleOnSave(id, data) {
        const POST_URL = id==="temp" ? `http://localhost:5000/boards/${this.board_id}/createRecord` : `http://localhost:5000/boards/${id}/update`;

        axios.post(POST_URL, data)
            .then(res => {
                console.log(res.data);
                this.componentDidMount()
            })
            .catch((error) => {
                console.log(error);
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
                <th>Users</th>
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
