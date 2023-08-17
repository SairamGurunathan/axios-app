import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';
import "./AxiosPost.css";
import { Image } from "../Assects/Img/Img";



const AxiosPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const setEdit = id ? true : false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\d{10}$/;

  const [errors, setErrors] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://fts-backend.onrender.com/admin/testing/getUserById?id=${id}`
      );
      if (res.data.response.status === "success") {
        setNewUser({
          name: res.data.response.user.name,
          email: res.data.response.user.email,
          phone_number: res.data.response.user.phone_number,
          message: res.data.response.user.message,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  },[]);


  const submitNewUser = async (e) => {
    e.preventDefault();
    const errorMessage = {};

    if (newUser.name.length === 0) {
      errorMessage.name = "Name is Required";
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
    if (newUser.message.length === 0) {
      errorMessage.message = "Message is Required";
    }
    setErrors(errorMessage);
    if (Object.keys(errorMessage).length === 0) {
      setEdit ? edit(newUser) : create(newUser);
    } else {
      console.log("Error while sending data:");
    }
  };

  const edit = async (newUserData) => {
    try {
      const res = await axios.put(
        `https://fts-backend.onrender.com/admin/testing/editUserById?id=${id}`,
        newUserData
      );
      if (res.data.response.status === "success") {
        toast(res.data.response.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (newUserData) => {
    try {
      const res = await axios.post(
        "https://fts-backend.onrender.com/user/newRegistration",
        newUserData
      );
      if (res.data.response.status === "success") {
        toast(res.data.response.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelButton = (e)=>{
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
        

  return (
    <>
      <div className="container-fluid my-4">
        <h1 className="my-3 text-center text-white">New Users</h1>
        <div className="row ">
          <div className="col-6">
            <img
              src={Image.signInImg}
              className="mx-5"
              style={{ width: "500px", height: "500px" }}
              alt="img"
            />
          </div>
          <div className="col-6">
            <Form className="border rounded-4 p-3 fw-bold ">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newUser.name}
                  name="name"
                  placeholder="Enter your Name"
                  className="rounded-3 shadow-lg"
                  onChange={(event) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      name: event.target.value,
                    }))
                  }
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={newUser.email}
                  name="email"
                  placeholder="Enter your Email"
                  className="rounded-3 shadow-lg"
                  onChange={(event) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      email: event.target.value,
                    }))
                  }
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  value={newUser.phone_number}
                  name="phone_number"
                  placeholder="Enter your Phone Number"
                  className="rounded-3 shadow-lg"
                  maxLength={10}
                  onChange={(event) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      phone_number: event.target.value,
                    }))
                  }
                />
                {errors.phone_number && (
                  <p style={{ color: "red" }}>{errors.phone_number}</p>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  value={newUser.message}
                  name="message"
                  rows={3}
                  className="rounded-3 shadow-lg"
                  onChange={(event) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      message: event.target.value,
                    }))
                  }
                />
                {errors.message && (
                  <p style={{ color: "red" }}>{errors.message}</p>
                )}
              </Form.Group>
              <div className="d-flex justify-content-around align-items-center">
                
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-lg btn-submit text-white px-5"
                  onClick={submitNewUser}
                >
                  Submit
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-lg btn-cancel text-white px-5"
                  onClick={cancelButton}
                >
                  Cancel
                </Button>
              </div>
              <ToastContainer />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AxiosPost;
