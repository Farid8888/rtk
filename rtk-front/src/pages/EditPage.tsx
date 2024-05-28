import Form from '../components/Form/Form'
import { IoIosArrowBack } from "react-icons/io"
import {useNavigate,useParams} from 'react-router'
import {useGetOnePostQuery} from '../store/services/postService'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

const EditPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {data:post,status} = useGetOnePostQuery(`${params.id}`)
  return (
    <div className='p-3'>
       <IoIosArrowBack style={{cursor:'pointer'}} className='display-5 link-dark' onClick={()=>navigate(-1)}/>
      {status === 'fulfilled' ? <Form title={post?.title} body={post?.body}/> : <LoadingSpinner/>}
    </div>
  )
}

export default EditPage
