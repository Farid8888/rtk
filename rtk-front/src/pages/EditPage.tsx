import Form from '../components/Form/Form'
import { IoIosArrowBack } from "react-icons/io"
import {useLocation, useNavigate} from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import {useAppSelector} from '../redux-saga(store)/store'

const EditPage = () => {
    const navigate = useNavigate()
    const {post} = useLocation().state
    const status = useAppSelector(state=>state.status.status?.status)
    console.log(status)
  return (
    <div className='p-3'>
       <IoIosArrowBack style={{cursor:'pointer'}} className='display-5 link-dark' onClick={()=>navigate(-1)}/>
      <Form title={post.title} body={post.body}/> 
    </div>
  )
}

export default EditPage
