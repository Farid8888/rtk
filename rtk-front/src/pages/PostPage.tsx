import React from "react";
import Post from "../components/Post/Post";
import { IoIosArrowBack } from "react-icons/io"
import {useNavigate,useParams} from 'react-router'
import {useStore} from '../components/context/Context(mobX)'
import {toJS} from 'mobx'
import {observer} from 'mobx-react-lite'

const PostPage = observer(() => {
    const navigate = useNavigate()
    const params = useParams()
    const {post:{fetchOne,post}} = useStore()
    React.useEffect(()=>{
      fetchOne(params.id as string)
    },[params.id])

    
  return (
    <div className="p-3">
      <IoIosArrowBack
        style={{ cursor: "pointer" }}
        className="display-5 link-dark"
        onClick={() => navigate(-1)}
      />
      <Post post={toJS(post)}/>
    </div>
  );
});

export default PostPage;
