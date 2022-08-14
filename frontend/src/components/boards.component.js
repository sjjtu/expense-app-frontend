import React, { Component, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReadOnlyRows from './read-only-rows.component'
import EditableRows from './editable-rows.component';


const Board = props => {
    if ("readOnly" in props.board) {
        return 
    }

    else {
        return(
            <tr>
                <td> <Link to={"/boards/"+props.board._id}>{props.board.name}</Link></td>
                <td >{props.board.description}</td>
                <td>{(props.board.users).join(", ")}</td>
                <td><button className='editRow'>Edit</button></td>
            </tr>
        )
    }
        

}


export default class BoardsList extends Component {
    constructor(props) {
        super(props);
        this.createNewBoard = this.createNewBoard.bind(this);
        this.state = {
            boards: []
        }

        this.handleOnEdit = this.handleOnEdit.bind(this);
        this.handleOnSave = this.handleOnSave.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
    }

    createNewBoard() {
        const newboards = this.state.boards.concat([{"name": "", "description":"", "users":[], "_editable": true, "_id":"temp"}])
        this.setState({boards: newboards})
    }

    componentDidMount() {
        axios.get("http://localhost:5000/boards/")
            .then(res => {
                console.log(res.data);
                this.setState({boards: res.data})
            })
            .catch((error) => {
                    console.log(error);
             })
    }

    handleOnEdit(id) {
        const boards_map = new Map(this.state.boards.map(obj => [obj._id, obj]));
        const editing_board =  boards_map.get(id);
        editing_board["_editable"] = true;

        console.log(Array.from(boards_map.values()));

        this.setState({boards: Array.from(boards_map.values())})
    }

    handleOnSave(id, data) {

        const POST_URL = id==="temp" ? `http://localhost:5000/boards/create` : `http://localhost:5000/boards/${id}/update`;

        axios.post(POST_URL, data)
            .then(res => {
                console.log(res.data);
                this.componentDidMount()
            })
            .catch((error) => {
                console.log(error);
            })
        
    }

    handleOnDelete(id) {
        const DELETE_URL = `http://localhost:5000/boards/${id}`
        axios.delete(DELETE_URL)
            .then(res => {
                console.log(res.data);
                this.componentDidMount();
            })
            .catch((error) => {
                console.log(error)
            })
    }


    boardsList() {
        return this.state.boards.map(currentBoard => {
            if ("_editable" in currentBoard) { // if it has an id then it already exists otherwise its a new entry
                return <EditableRows 
                            inputs={currentBoard} 
                            attrList={["name", "description", "users"]}
                            link={`/boards/${currentBoard._id}`}
                            id={currentBoard._id}
                            key={currentBoard._id}
                            handleOnSave={this.handleOnSave}
                        />;
                
            } else {
                return <ReadOnlyRows 
                            inputs={currentBoard} 
                            attrList={["name", "description", "users"]}
                            id={currentBoard._id} 
                            link={"/boards/"+currentBoard._id}
                            key={currentBoard._id} 
                            handleOnEdit={this.handleOnEdit}
                            handleOnDelete={this.handleOnDelete}
                        />;
            }
            
        })
    }

    render() {
        return (
        <div>
            <h3>All Boards</h3>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Users</th>
                </tr>
            </thead>
            <tbody>
                { this.boardsList() }
            </tbody>
            </table>
            <button className='addRow' onClick={this.createNewBoard}>Add</button>
      </div>
        );
    }
}