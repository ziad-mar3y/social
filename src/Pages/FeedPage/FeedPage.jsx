import React, { useEffect, useState } from "react";
import { getAllPostsApi } from "../../Services/PostsApi";
import LoadingScrean from "../LoadingScrean/LoadingScrean";
import PostComponent from "../../Component/PostComponent";
import CreatePost from "../../Component/Post/CreatPost";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllPosts() {
    const data = await getAllPostsApi();
    console.log(data);
    if (data.message == "success") {
      setPosts(data.posts);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="grid  max-w-2xl mx-auto  sm:p-10  xs:p-1 gap-2  ">

      <CreatePost getAllPosts={getAllPosts}/>
      {isLoading ? (
        <LoadingScrean />
      ) : (
        posts.map((post) => <PostComponent callback={getAllPosts} key={post.id} post={post} commentsLimit={1} />)
      )}
    </div>
  );
}
