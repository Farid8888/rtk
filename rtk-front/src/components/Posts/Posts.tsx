import { useNavigate } from "react-router";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { POST,STATUS } from '../../types/types';



const Posts:React.FC<{posts:POST[],status:STATUS,remove:(id:any)=>{}}> = ({posts,status,remove}) => {
const navigate = useNavigate();

  const postHandler = (id: string) => {
    navigate(`/post/${id}`);
  };
if(status.status === 'SEND'){
  return <div className="d-flex align-content-center justify-content-center min-vh-100 flex-wrap"><LoadingSpinner/></div>
}
  const editHandler = (id: any,post:POST) => {
    navigate(`/edit/${id}`,{state:{post:post}});
  };

  if (posts.length === 0 && status.status == 'SUCCESS') {
    return (
      <div className="d-flex flex-column align-content-center justify-content-center flex-wrap min-vh-100">
        <p className="text-center">No posts added</p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Please add item
        </button>
      </div>
    );
  }

  if(status.status === 'ERROR'){
    return <div className='d-flex align-content-center justify-content-center vh-100 flex-wrap text-danger'>{status.message}</div>
  }
  return (
    <div className="d-flex flex-column align-items-center m-5">
      {posts.map((post) => {
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
              onClick={()=>remove(post.id)}>
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
