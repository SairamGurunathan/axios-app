import React from 'react';
import Table from 'react-bootstrap/Table';
import { BsDatabaseAdd } from "react-icons/bs";
import { BiSolidEditAlt,BiShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



const TableData = ({axis,setTrigger,trigger}) => {
    const navigate = useNavigate();
    
    const delete_notify = () => toast.success('Deleted succesfully...', {
        position: toast.POSITION.TOP_RIGHT
    });
    const edituser = async (id) => {
        try{
            await axios.put(`https://fts-backend.onrender.com/admin/testing/editUserById?id=${id}`);

        }
        catch (error){
            console.log(error);
           }
    }

    const deleteUser = async (id) => {
        try{
            await axios.delete(`https://fts-backend.onrender.com/admin/testing/deleteUserById?id=${id}`);
            setTrigger(!trigger)
        }
        catch (error){
            console.log(error);
           }
           delete_notify();
        }
    
    const inputData = ()=>{
        navigate("/add-user");
    }
    
  return (
    <div className='container-fluid'>
    <h1 className='my-5 text-info'>API Data</h1>
    <div className='d-flex float-start mb-5'>
        <button className='btn btn-outline-light border-2 border-light rounded-2 fs-6 d-flex align-items-center fw-bold gap-2' onClick={inputData}><BsDatabaseAdd/>ADD</button>
        
    </div>
    <div>
    <Table striped="columns" bordered hover variant="secondary">
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
                <button className='btn btn-outline fs-5' onClick={()=>edituser(per.id)}><BiSolidEditAlt/></button>
                <button className='btn btn-outline fs-5' onClick={()=>deleteUser(per.id)}><MdDeleteForever/></button>
                <button className='btn btn-outline fs-5'><BiShow/></button>
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