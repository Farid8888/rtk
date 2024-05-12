import React from "react";
import { useAppSelector,useAppDispatch } from "../../store/store";
import {fetchOne} from '../../store/actions/actions'
import {useParams,useNavigate} from 'react-router'


const Post = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
     dispatch(fetchOne(params.id!))
    },[dispatch])
  const post = useAppSelector((state) => state.rootStore.posts.post);

  const editHandler =()=>{
    navigate(`/edit/${params.id}`,{state:{post:post}})
  }
  if(!post){
    return <div>null</div>
  }
  return (
    <div className="d-flex justify-content-center align-content-center min-vh-100 flex-wrap">
      <div className="d-flex flex-column gap-2 rounded-2 shadow w-50 btn btn-light text-start p-4" onClick={editHandler.bind(post.id)}>
        <h1>{post?.title}</h1>
        <p>{post?.body}</p>
      </div>
    </div>
  );
};

export default Post;
