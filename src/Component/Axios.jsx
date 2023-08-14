import axios from 'axios';
import React, { useEffect } from 'react'

const Axios = ({trigger,setAxis}) => {
  
     const get_users = async ()=>{
      try{
        const res = await axios.get("https://fts-backend.onrender.com/admin/testing/getallusers?offset=1&limit=10")
        return setAxis(res.data.response.paginationOutput.items);
      }
     catch (error){
      console.log(error);
     }
    }

    useEffect(() => {    
        get_users();
    },[trigger])

  return (
    <></>
  )
}

export default Axios