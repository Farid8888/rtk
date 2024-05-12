import React from "react";
import Post from "../components/Post/Post";
import { IoIosArrowBack } from "react-icons/io"
import {useNavigate} from 'react-router'

const PostPage = () => {
    const navigate = useNavigate()
  return (
    <div className="p-3">
      <IoIosArrowBack
        style={{ cursor: "pointer" }}
        className="display-5 link-dark"
        onClick={() => navigate(-1)}
      />
      <Post />
    </div>
  );
};

export default PostPage;
