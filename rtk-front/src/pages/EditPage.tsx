import React from 'react'
import Form from '../components/Form/Form'
import { IoIosArrowBack } from "react-icons/io"
import {useNavigate,useLocation} from 'react-router'


const EditPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {post} = location.state
  return (
    <div className='p-3'>
       <IoIosArrowBack style={{cursor:'pointer'}} className='display-5 link-dark' onClick={()=>navigate(-1)}/>
      <Form title={post.title} body={post.body}/>
    </div>
  )
}

export default EditPage
