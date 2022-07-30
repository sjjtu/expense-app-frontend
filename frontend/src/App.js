import logo from './logo.svg';
import './App.css';
import Reach from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, useParams} from "react-router-dom";

import Navbar from './components/Navbar.component';
import Boards from './components/boards.component';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar></Navbar>
        <Routes>
          <Route path="/boards" element={<Boards/>}></Route>
          <Route path="/boards/:board_id"></Route>
          <Route path="/users"></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
