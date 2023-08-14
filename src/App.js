import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Axios from './Component/Axios';
import TableData from './Component/TableData';
import { useState } from 'react';
import AxiosPost from './Component/AxiosPost';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [axis, setAxis] = useState([]);
  const [trigger,setTrigger] = useState(false)

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<TableData axis={axis} setAxis={setAxis} setTrigger={setTrigger} trigger = {trigger}/>}/>
        
        <Route path='/add-user' element={<AxiosPost  setAxis={setAxis} axis={axis} setTrigger={setTrigger} trigger={trigger}/>}/>
      </Routes>
      <Axios setAxis={setAxis} trigger = {trigger}/>     
    </div>
  );
}

export default App;
