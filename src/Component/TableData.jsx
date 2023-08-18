import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { BsDatabaseAdd } from "react-icons/bs";
import { BiSolidEditAlt, BiShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2';
import moment from "moment/moment";

const TableData = ({ axis, setAxis }) => {
  
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);


  const handlePageClick = (data) => {
    get_users(data.selected + 1);
  };

  const get_users = async (data) => {
    try {
      const res = await axios.get(
        `https://fts-backend.onrender.com/admin/testing/getallusers?offset=${data}&limit=5`
      );
      setAxis(res.data.response.paginationOutput.items);
      setTotalPage(res.data.response.paginationOutput.totalPages)
      setTotalCount(res.data.response.paginationOutput.totalCount);
      console.log(res.data.response.paginationOutput);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure need to delete?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
          axios.delete(`https://fts-backend.onrender.com/admin/testing/deleteUserById?id=${id}`)
          .then((res)=>{
            if (res.data.response.status === "success") {
              toast(res.data.response.message);
              get_users(1);
            }
          })
      }
    })
  }; 


  const inputData = () => {
    navigate("/add-user");
  };

  useEffect(() => {
    get_users(1);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      
      <div className="my-4 ms-3">
      <h1 className="text-info">API Data</h1>
        <button
          className="btn btn-outline-light border-2 border-light rounded-2 fs-5 d-flex align-items-center fw-bold gap-2"
          onClick={inputData}
        >
          <BsDatabaseAdd />
          ADD
        </button>
      </div>
    <div className="container-fluid"> 
      <div>
        <Table
          striped
          bordered
          hover
          responsive
          variant="danger"
        >
          <thead>
            <tr>
              <th>S. No</th>
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
            {axis.map((per, index) => (
              <tr key={index}>
                <td>{(index + 1)}</td>
                <td>{per.name}</td>
                <td>{per.email}</td>
                <td>{per.phone_number}</td>
                <td>{per.message}</td>
                <td>{moment(per.createdAt).format('MMMM DD YYYY')}</td>
                <td>{moment(per.updatedAt).format('MMMM DD YYYY')}</td>
                <td>
                  <div className="d-flex">
                    <button
                      className="btn btn-outline fs-5"
                      onClick={() => navigate(`/edit-user/${per.id}`)}
                    >
                      <BiSolidEditAlt />
                    </button>
                    <button
                      className="btn btn-outline fs-5"
                      onClick={() => deleteUser(per.id)}
                    >
                      <MdDeleteForever />
                    </button>
                    <button
                      className="btn btn-outline fs-5"
                      onClick={() => navigate(`/user-data/${per.id}`)}
                    >
                      <BiShow />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={totalPage}
          pageRangeDisplayed={10}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center float-start"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          renderOnZeroPageCount={null}
        />
        <ToastContainer />
      </div>
    </div>
    </>
  );
};

export default TableData;
