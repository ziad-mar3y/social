import React, { useEffect, useState } from "react";
import { getAllPostsApi } from "../../Services/PostsApi";
import LoadingScrean from "../LoadingScrean/LoadingScrean";
import PostComponent from "../../Component/PostComponent";
import CreatePost from "../../Component/Post/CreatPost";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/spinner";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // async function getAllPosts() {
  //   const data = await getAllPostsApi();
  //   console.log(data);
  //   if (data.message == "success") {
  //     setPosts(data.posts);
  //     setIsLoading(false);
  //   }
  // }

  const {data , isLoading , isFetching , refetch } = useQuery({
    queryKey:["posts"],
    queryFn: getAllPostsApi
  })





  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  return (
    <div className="grid  max-w-2xl mx-auto   gap-2  ">

      <CreatePost getAllPosts={refetch}/>
      {isFetching && !isLoading && <Spinner className="text-center"/>}
      {isLoading ? (
        <LoadingScrean />
      ) : (
      data?.data.posts.map((post) => <PostComponent callback={refetch} key={post.id} post={post} commentsLimit={1} />)
      )}
    </div>
  );
}
