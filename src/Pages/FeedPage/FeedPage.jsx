import React, {  useState } from "react";
import { deletePostApi, getAllPostsApi } from "../../Services/PostsApi";
import LoadingScrean from "../LoadingScrean/LoadingScrean";
import PostComponent from "../../Component/PostComponent";
import CreatePost from "../../Component/Post/CreatPost";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // async function getAllPosts() {
  //   const response = await getAllPostsApi();
  //   console.log(response);
  //   if (response.message == "success") {
  //     setPosts(response.posts);
  //     setIsLoading(false);
  //   }
  // }

  //  useEffect(() => {
  //   getAllPosts();
  // }, []);

    async function handleDeletePost(onClose , setIsPostDeleted , postId , ) {
      setIsPostDeleted(true);
      const response = await deletePostApi(postId);
      if (response.message == "success") {
        await getAllPosts();
        setIsPostDeleted(false);
        onClose();
        addToast({
          title: "delete successfully",
          timeout: 2000,
          color: "success",
        });
      }
    }



    const { data, isLoading, isFetching, refetch } = useQuery ({
    queryKey: ["posts"],
    queryFn: getAllPostsApi
  });


 

  return (
    <div className="grid  max-w-2xl mx-auto   gap-2  ">

      <CreatePost getAllPosts={refetch}/>
      {isLoading ? (
        <LoadingScrean />
      ) : (
        data?.data.posts.map((post) => <PostComponent callback={refetch} key={post._id} post={post} commentsLimit={1} handleDeletePost={handleDeletePost} />)
      )}
    </div>
  );
}
