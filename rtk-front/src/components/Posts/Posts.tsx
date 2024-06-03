import {useContext} from 'react'
import { useNavigate } from "react-router";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import {Context} from '../context/useContext'
import {deletePost,getStatus} from '../../createAsyncThunk(store)/postSlice'
import {useAppDispatch, useAppSelector} from '../../createAsyncThunk(store)/store'

const Posts = () => {
  const navigate = useNavigate();
  const data = useContext(Context).posts
  const isLoading =useContext(Context).isLoading
  const error = useContext(Context).error as {fetchErr?:string | undefined}
  const dispatch = useAppDispatch()

  console.log(error,data)
  if(error.fetchErr){
    return <div className='d-flex align-content-center justify-content-center vh-100 flex-wrap text-danger'>{error.fetchErr}</div>
  }
const status = useAppSelector(state=>getStatus(state,'patch'))

  const postHandler = (id: string) => {
    navigate(`/post/${id}`);
  };
if(isLoading){
  return <div className="d-flex align-content-center justify-content-center min-vh-100 flex-wrap"><LoadingSpinner/></div>
}
  const editHandler = (id: any) => {
    navigate(`/edit/${id}`);
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
            <div
              className="m-0 btn btn-danger  text-start w-100 rounded-3 py-3 px-5"
              onClick={() => postHandler(post.id)}
            >
              {status ==='pending' ?  <LoadingSpinner st={{'fontSize':'1.2rem',"height":'1.3rem',"width":"1.3rem"}}/>  :post.title}
            </div>
            <button
              type="button"
              className="btn btn-dark"
              onClick={()=>dispatch(deletePost(post.id))}
            >
              DELETE
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => editHandler(post.id)}
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
