import { useContext } from "react";
import { Context } from "../context/useContext";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { removePost } from "../../store/actions/actions";
import { useNavigate } from "react-router";
import { POST } from "../../types/types";



const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const posts = useContext(Context);
  const status = useAppSelector((state) => state.rootStore.status);


  const postHandler = (id: string) => {
    navigate(`/post/${id}`);
  };

  const editHandler = (id: any, post: POST) => {
    navigate(`/edit/${id}`, { state: { post: post } });
  };
  if (status.status?.status === "SEND") {
    return (
      <div className="d-flex flex-column justify-content-center align-content-center flex-wrap  min-vh-100">
        {status.status.message}
      </div>
    );
  }

  // if (status.status?.status === "ERROR") {
  //   return (
  //     <div className="d-flex flex-column align-content-center justify-content-center flex-wrap min-vh-100">
  //       <p className="text-center">{status.status?.message}</p>
  //     </div>
  //   );
  // }
  if (posts.posts?.length === 0) {
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
      {posts.posts?.map((post) => {
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
              onClick={() => dispatch(removePost(post.id))}
            >
              DELETE
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => editHandler(post.id, post)}
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
