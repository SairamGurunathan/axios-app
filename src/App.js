import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TableData from "./Component/TableData";
import { useState } from "react";
import AxiosPost from "./Component/AxiosPost";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


import ViewUser from "./Component/ViewUser";

function App() {
  const [axis, setAxis] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<TableData axis={axis} setAxis={setAxis} />}
        />

        <Route
          path="/add-user"
          element={<AxiosPost setAxis={setAxis} axis={axis} />}
        />

        <Route
          path="/edit-user/:id"
          element={<AxiosPost setAxis={setAxis} axis={axis} />}
        />

        <Route path="/user-data/:id" element={<ViewUser />} />
      </Routes>
    </div>
  );
}

export default App;
