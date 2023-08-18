import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { Image } from "../Assects/Img/Img";
import {BiArrowBack} from "react-icons/bi" 

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
      
        <Card  bg={'primary'} style={{ width: '40rem', height:"20rem" }}>
          {/* <Card.Img variant="top" src={Image.cardImages} style={{ width: "100%", height: "200px" }}
              alt="img"/> */}
          <Card.Body>
            <Card.Title>
              <div className="d-flex justify-content-between align-items-center px-3 border">
              <h1 className="text-white">Fyndus Technologies</h1>
              <Button variant="light" className="d-flex p-1" onClick={backButton}>
             <BiArrowBack/>
            </Button>
              </div>
            </Card.Title>
            <Card.Text>
            <Container >
          <Row className=" mt-4">
            <Col xs={12} md={4}>
                <img src={Image.cardImages} className="h-100 w-100" alt="img"/>
            </Col>
            <Col>
            <div className="text-center text-white">
              <h3 className="text-uppercase">{userData.name}</h3>
              <hr className="border-2 "/>
              <h5>{userData.email}</h5>
              <h5>{userData.phone_number}</h5>
              <h5>{userData.message}</h5>
              </div>
              {/* <div className="d-flex justify-content-center align-items-center">
            <Button variant="light" className="mt-2 fw-bold" onClick={backButton}>
             <BiArrowBack/> Back
            </Button>
            </div> */}
            </Col>
          </Row>
        </Container>
            </Card.Text>
            
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ViewUser;
