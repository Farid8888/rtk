import {useParams,useNavigate} from 'react-router'
import { POST } from '../../types/types';

const Post:React.FC<{post:POST | null}> = ({post}) => {
const params = useParams()
const navigate = useNavigate()

  const editHandler =()=>{
    navigate(`/edit/${params.id}`,{state:{post:post}})
  }
  if(!post){
    return <div>null</div>
  }
  let content=(
    <div className="d-flex flex-column gap-2 rounded-2 shadow w-50 btn btn-light text-start p-4" onClick={editHandler.bind(post.id)}>
        <h1>{post?.title}</h1>
        <p>{post?.body}</p>
      </div>
  )

  return (
    <div className="d-flex justify-content-center align-content-center min-vh-100 flex-wrap">
      {content}
    </div>
  );
};

export default Post;
