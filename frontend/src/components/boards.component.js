import React, { Component, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let example_list = [{"name": "test1", "description":"this is a fictional board", "users":["user1", "user2"], "_id":"12312321"}];

const Board = props => {return(
    <tr>
        <td> <Link to={"/boards/"+props.board._id}>{props.board.name}</Link></td>
        <td>{props.board.description}</td>
        <td>{(props.board.users).join(", ")}</td>
    </tr>
)}

export default class BoardsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: []
        }
    }

    componentDidMount() {
        this.setState({boards: example_list});
        axios.get("http://localhost:5000/boards/")
            .then(res => {
                console.log(res.data);
                this.setState({boards: res.data})
            })
            .catch((error) => {
                    console.log(error);
             })
    }

    boardsList() {
        return this.state.boards.map(currentBoard => {
            return <Board board={currentBoard} key={currentBoard._id}/>;
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
      </div>
        );
    }
}