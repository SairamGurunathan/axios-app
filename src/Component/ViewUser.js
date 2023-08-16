import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const ViewUser = () => {
    const {id} = useParams();
    console.log(id);
    const navigate = useNavigate();
    const [userData, setUserData] = useState([])
    
    const viewData = async () => {
      try {
        const res = await axios.get(`https://fts-backend.onrender.com/admin/testing/getUserById?id=${id}`);
        if(res.data.response.status === "success"){
          setUserData(res.data.response.user)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      viewData()
    },[])
console.log(userData);
  return (
    <>
    <div className='d-flex justify-content-center align-items-center vh-100'>
    <Card>
      <Card.Body>
        <Card.Title><h1 className='text-center'>User Data</h1></Card.Title>
        <Card.Text>
            <div>
            <h5>Name : {userData.name}</h5>
            <h5>Email : {userData.email}</h5>
            <h5>Phone Number : {userData.phone_number}</h5>
            <h5>Message : {userData.message}</h5>
            </div>
            
        </Card.Text>
        <Button variant="primary" onClick={()=>navigate('/')}>Back</Button>
      </Card.Body>
    </Card>
    </div>
    </>
  )
}

export default ViewUser;