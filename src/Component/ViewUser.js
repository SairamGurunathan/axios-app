import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const backButton = (e)=>{
    e.preventDefault();
    Swal.fire({
      title: "Are you sure need to exit?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        navigate('/');
      }
    })
  }

  const viewData = async () => {
    try {
      const res = await axios.get(
        `https://fts-backend.onrender.com/admin/testing/getUserById?id=${id}`
      );
      if (res.data.response.status === "success") {
        setUserData(res.data.response.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    viewData();
    // eslint-disable-next-line
  },[]);

  
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
      
        <Card border="dark" bg={'primary'} >
          <Card.Body>
            <Card.Title>
              <h1 className="text-center text-white mb-5">User Data</h1>
            </Card.Title>
            <Card.Text>
              <div className="text-white">
                <h5>Name : {userData.name}</h5>
                <h5>Email : {userData.email}</h5>
                <h5>Phone Number : {userData.phone_number}</h5>
                <h5>Message : {userData.message}</h5>
              </div>
            </Card.Text>
            <div className="d-flex justify-content-center align-items-center">
            <Button variant="primary" className="mt-2 btn btn-lg px-5 btn-outline-dark fw-bold" onClick={backButton}>
              Back
            </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ViewUser;
