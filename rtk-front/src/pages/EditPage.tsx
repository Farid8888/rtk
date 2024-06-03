import Form from '../components/Form/Form'
import { IoIosArrowBack } from "react-icons/io"
import {useNavigate,useParams} from 'react-router'
import {useFetchPostsHook} from '../createAsyncThunk(store)/hooks'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import {POST} from '../types/types'

const EditPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {data:post,isSuccess} = useFetchPostsHook({id:`${params.id}`}) as POST
  return (
    <div className='p-3'>
       <IoIosArrowBack style={{cursor:'pointer'}} className='display-5 link-dark' onClick={()=>navigate(-1)}/>
      {isSuccess ? <Form title={post?.title} body={post?.body}/> : <div className='d-flex align-content-center justify-content-center min-vh-100 flex-wrap'><LoadingSpinner/></div>}
    </div>
  )
}

export default EditPage
