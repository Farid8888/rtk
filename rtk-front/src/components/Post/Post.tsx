import {useEffect} from 'react'
import {useParams,useNavigate} from 'react-router'
import {getPostSaga} from '../../redux-saga(store)/reducers/postSlice'
import {useAppDispatch,useAppSelector} from '../../redux-saga(store)/store'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Post = () => {
const params = useParams()
const navigate = useNavigate()
const data = useAppSelector(state=>state.posts.post)
const status = useAppSelector(state=>state.status.status?.status)
const dispatch = useAppDispatch()
useEffect(()=>{
dispatch(getPostSaga(params.id!))
},[dispatch])

console.log(status)
  const editHandler =()=>{
    navigate(`/edit/${params.id}`,{state:{post:data}})
  }
  if(!data){
    return <div>null</div>
  }
  let content=(
    <div className="d-flex flex-column gap-2 rounded-2 shadow w-50 btn btn-light text-start p-4" onClick={editHandler.bind(data.id)}>
        <h1>{data?.title}</h1>
        <p>{data?.body}</p>
      </div>
  )
  if(status === 'SEND'){
    content = <LoadingSpinner/>
  }
  return (
    <div className="d-flex justify-content-center align-content-center min-vh-100 flex-wrap">
      {content}
    </div>
  );
};

export default Post;
