import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Image } from '../Assects/Img/Img';
import './AxiosPost.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



const AxiosPost = ({setTrigger,trigger}) => {
    const navigate = useNavigate();
    const notify = () => toast.success('Submitted succesfully...', {
        position: toast.POSITION.TOP_RIGHT
    });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\d{10}$/;
    
    const [errors,setErrors] = useState("");
    const [newUser,setNewUser] = useState({
        name:"",
        email:"",
        phone_number:"",
        message:"",
    })

    const submitNewUser = async (e) => {
        e.preventDefault();
        const errorMessage = {};
    
        if(newUser.name.length === 0){
            errorMessage.name = 'Name is Required';
        }
        if (newUser.email.length === 0) {
            errorMessage.email = "Email is required";
        } else if (!emailRegex.test(newUser.email)) {
            errorMessage.email = "Invalid email format";
        }
        if (newUser.phone_number.length === 0) {
            errorMessage.phone_number = "Number is required";
        } else if (!mobileRegex.test(newUser.phone_number)) {
            errorMessage.phone_number = "Invalid Number format";
        }
        if(newUser.message.length === 0){
            errorMessage.message = 'Message is Required';
        }
        setErrors(errorMessage)
        
        if(Object.keys(errorMessage).length === 0) {
            try {
                await create(newUser);
            } catch (error) {
                console.error("Error while sending data:", error);
            }
        }

        notify();
        setTimeout(() => {
            navigate("/");
        },5000);
    }
    
    const create = async (newUserData) => {
        try {
            await axios.post("https://fts-backend.onrender.com/user/newRegistration", newUserData);
            console.log("Data sent successfully");
            setTrigger(!trigger)
        } catch (error) {
            console.error("Error while sending data:", error);
        }
    }
    
  return (
    <>
    <div className='container-fluid my-4'>
    <div className="row p-3">
        <div className="col-6">
            <img src={Image.signInImg} style={{width:"500px",height:"500px"}} alt="img" />
        </div>
        <div className="col-6">
        <Form className='border rounded-4 p-3 fw-bold '>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter your Name" className='rounded-3 shadow-lg'  onChange={(event) =>
    setNewUser((prevUser) => ({
      ...prevUser,
      name: event.target.value
    }))}
/>
        {errors.name && (<p style={{ color: "red" }}>{errors.name}</p>)}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter your Email" className='rounded-3 shadow-lg'
        onChange={(event) =>
            setNewUser((prevUser) => ({
              ...prevUser,
              email: event.target.value
            }))}  
/>
        {errors.email && (<p style={{ color: "red" }}>{errors.email}</p>)}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" name='phone_number' placeholder="Enter your Phone Number" className='rounded-3 shadow-lg' maxLength={10} onChange={(event) =>
    setNewUser((prevUser) => ({
      ...prevUser,
      phone_number: event.target.value
    }))}/>
        {errors.phone_number && (<p style={{ color: "red" }}>{errors.phone_number}</p>)}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" name='message' rows={3} className='rounded-3 shadow-lg'
        onChange={(event) =>
    setNewUser((prevUser) => ({
      ...prevUser,
      message: event.target.value
    }))}/>
        {errors.message && (<p style={{ color: "red" }}>{errors.message}</p>)}
      </Form.Group>
    <div className='d-grid 
    text-center'>
      <Button variant="primary" type="submit" className='btn btn-lg btn-dark text-white px-4' onClick={submitNewUser}>
        Submit
      </Button>
      <ToastContainer/>
      </div>
    </Form>
        </div>
    </div>

    
    </div>
    </>
  )
}

export default AxiosPost