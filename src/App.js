import React from 'react';
import './App.css';
  import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, useParams} from "react-router-dom";

import Navbar from './components/Navbar.component';
import Boards from './components/boards.component';
import Board from './components/board.component';

require('dotenv').config()

const WrapperBoard = () => {
  const id = useParams();
  return <Board id={id}></Board>;
}

function App() {
  console.log(`${process.env.react_app_backend_url}`);
  return (
    <Router>
      <div className='container'>
        <Navbar></Navbar>
        <Routes>
          <Route path="/boards" element={<Boards/>}></Route>
          <Route path="/boards/:id" element={<WrapperBoard/>}></Route>
          <Route path="/users"></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
