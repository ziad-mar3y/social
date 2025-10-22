import React, { useContext, useEffect, useState } from "react";
import { getPostDetailsApi } from "../../Services/PostsApi";
import { useParams } from "react-router-dom";
import PostComponent from "../../Component/PostComponent";
import LoadingScrean from "../LoadingScrean/LoadingScrean";
// import { callBackContext } from "../../Contexts/CallBackProvider";
import ToggleMode from "../../Component/ToggleMode";
import { authContext } from "../../Contexts/AuthContextProvider";

export default function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  async function getPostDetails() {
    const response = await getPostDetailsApi(id);
    console.log(response);
    if (response.message == "success") {
      setPost(response.post);
    }
  }

  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <div className="md:w-2xl mx-auto p-1 ">
      {post ? <PostComponent post={post} /> : <LoadingScrean />}
    </div>
  );
}
