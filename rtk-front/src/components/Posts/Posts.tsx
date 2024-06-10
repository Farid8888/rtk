import {useContext} from 'react'
import { useNavigate } from "react-router";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { Context } from '../context/useContext';
import {useAppDispatch} from '../../redux-saga(store)/store'
import {deletePostSaga} from '../../redux-saga(store)/reducers/postSlice'
import { POST } from '../../types/types';


const Posts = () => {
const navigate = useNavigate();
const dispatch = useAppDispatch()
const status = useContext(Context).status
const data = useContext(Context).posts
  const postHandler = (id: string) => {
    navigate(`/post/${id}`);
  };
if(status === 'SEND'){
  return <div className="d-flex align-content-center justify-content-center min-vh-100 flex-wrap"><LoadingSpinner/></div>
}
  const editHandler = (id: any,post:POST) => {
    navigate(`/edit/${id}`,{state:{post:post}});
  };

  if (data?.length === 0) {
    return (
      <div className="d-flex flex-column align-content-center justify-content-center flex-wrap min-vh-100">
        <p className="text-center">No posts added</p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Please add item
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center m-5">
      {data?.map((post) => {
        return (
          <div key={post.id} className="w-50 d-flex gap-3 mb-3">
            <p
              className="m-0 btn btn-danger  text-start w-100 rounded-3 py-3 px-5"
              onClick={() => postHandler(post.id)}
            >
              {post.title}
            </p>
            <button
              type="button"
              className="btn btn-dark"
              onClick={()=>dispatch(deletePostSaga(post.id))}>
              DELETE
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => editHandler(post.id,post)}
            >
              EDIT
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
