import React, { useEffect, useState } from "react";
import { getAllPostsApi } from "../../Services/PostsApi";
import LoadingScrean from "../LoadingScrean/LoadingScrean";
import PostComponent from "../../Component/PostComponent";
import CreatePost from "../../Component/Post/CreatPost";
import { useQuery } from "@tanstack/react-query";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllPosts() {
    const response = await getAllPostsApi();
    console.log(response);
    if (response.message == "success") {
      setPosts(response.posts);
      setIsLoading(false);
    }
  }

   useEffect(() => {
    getAllPosts();
  }, []);




  //   const { data, isLoading, isFetching, refetch } = useQuery ({
  //   queryKey: ["posts"],
  //   queryFn: getAllPostsApi
  // });


 

  return (
    <div className="grid  max-w-2xl mx-auto   gap-2  ">

      <CreatePost getAllPosts={getAllPosts}/>
      {isLoading ? (
        <LoadingScrean />
      ) : (
        posts.map((post) => <PostComponent callback={getAllPosts} key={post._id} post={post} commentsLimit={1} />)
      )}
    </div>
  );
}
