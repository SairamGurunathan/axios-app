import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { BsDatabaseAdd } from "react-icons/bs";
import { BiSolidEditAlt,BiShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const TableData = ({axis,setAxis}) => {

  const navigate = useNavigate();

  const get_users = async ()=>{
    try{
      const res = await axios.get("https://fts-backend.onrender.com/admin/testing/getallusers?offset=1&limit=10")
     setAxis(res.data.response.paginationOutput.items);
    }
   catch (error){
    console.log(error);
   }
  }

    const deleteUser = async (id) => {
        try{
            const resp = await axios.delete(`https://fts-backend.onrender.com/admin/testing/deleteUserById?id=${id}`);
            if(resp.data.response.status === "success"){
              toast(resp.data.response.message)
            }
        }
        catch (error){
            console.log(error);
           }
           
        }
    
    const inputData = ()=>{
        navigate("/add-user");
    }

    useEffect(() => {    
      get_users();
    },[])
    
  return (
    <div className='container-fluid'>
    <h1 className='mt-5 text-info'>API Data</h1>
    <div className='d-flex float-start my-3'>
        <button className='btn btn-outline-light border-2 border-light rounded-2 fs-5 d-flex align-items-center fw-bold gap-2' onClick={inputData}><BsDatabaseAdd/>ADD</button>   
    </div>
    <div>
    <Table striped="columns" bordered hover variant="secondary" className='mb-5'>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Message</th>
      <th>CreatedAt</th>
      <th>UpdatedAt</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {axis.map((per,index) => (
        <tr key={index}>
        <td>{index + 1}</td>
        <td>{per.name}</td>
        <td>{per.email}</td>
        <td>{per.phone_number}</td>
        <td>{per.message}</td>
        <td>{per.createdAt}</td>
        <td>{per.updatedAt}</td>
        <td>
            <div className='d-flex'>
                <button className='btn btn-outline fs-5' onClick={()=>navigate(`/edit-user/${per.id}`)}><BiSolidEditAlt/></button>
                <button className='btn btn-outline fs-5' onClick={()=>deleteUser(per.id)}><MdDeleteForever/></button>
                <button className='btn btn-outline fs-5' onClick={()=>navigate(`/user-data/${per.id}`)}><BiShow/></button>
            </div>
        </td>
        
      </tr>
      
    ))}
    
  </tbody>
</Table>
<ToastContainer/>
</div>
</div>
  )
}

export default TableData