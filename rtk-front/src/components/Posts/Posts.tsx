import { useAppDispatch} from "../../store/store";
import { removePost } from "../../store/actions/actions";
import { useNavigate} from "react-router";
import { MESSAGE, POST } from "../../types/types";
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {getPosts,deletePost} from '../../store(ReactQuery)/api'



const Posts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const {data:posts,error,isLoading,status:st} = useQuery<POST[] | MESSAGE >({queryKey:['posts'],queryFn:getPosts})
  const mutation = useMutation({
    mutationFn:deletePost,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['posts']})
    }
  })

  const postHandler = (id: string) => {
    navigate(`/post/${id}`);
  };

  const editHandler = (id: any, post: POST) => {
    navigate(`/edit/${id}`, { state: { post: post } });
  };
  if (isLoading && !error) {
    return (
      <div className="d-flex flex-column justify-content-center align-content-center flex-wrap  min-vh-100">
          <LoadingSpinner/>
      </div>
    );
  }

  if (error || (posts as MESSAGE).message) {
    return (
      <div className="d-flex flex-column align-content-center justify-content-center flex-wrap min-vh-100">
        {posts ? (posts as MESSAGE).message?.error : 'Something went wrong'}
      </div>
    );
  }
  if (!posts || (posts as POST[]).length === 0 && !isLoading) {
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
      {(posts as POST[]).map((post) => {
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
              onClick={() =>mutation.mutate(post.id)}
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
