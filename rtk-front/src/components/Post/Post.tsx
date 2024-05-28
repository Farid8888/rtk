import {useParams,useNavigate} from 'react-router'
import {useGetOnePostQuery} from '../../store/services/postService'

const Post = () => {

    const params = useParams()
    const navigate = useNavigate()
    const {data} =useGetOnePostQuery(`${params.id}`)
console.log(data)
  const editHandler =()=>{
    navigate(`/edit/${params.id}`)
  }
  if(!data){
    return <div>null</div>
  }
  return (
    <div className="d-flex justify-content-center align-content-center min-vh-100 flex-wrap">
      <div className="d-flex flex-column gap-2 rounded-2 shadow w-50 btn btn-light text-start p-4" onClick={editHandler.bind(data.id)}>
        <h1>{data.title}</h1>
        <p>{data.body}</p>
      </div>
    </div>
  );
};

export default Post;
