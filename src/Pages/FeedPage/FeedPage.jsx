import React, { useContext, useEffect, useState } from "react";
import { counterContext } from "../../Contexts/CounterContext";
import { getAllPostsApi } from "../../Services/PostsApi";
import { h1 } from "framer-motion/client";
import Skeletor from "../../Component/Skeletor";
import { Card, CardBody, CardHeader } from "@heroui/react";
import LoadingScrean from "../LoadingScrean/LoadingScrean";
import CardComponent from "../../Component/CardComponent";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  async function getAllPosts() {
    const data = await getAllPostsApi();
    console.log(data);

    if (data.message == "success") {
      setPosts(data.posts);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (






    <div className="grid gap-3   max-w-2xl mx-auto  ">
      {isLoading ? <LoadingScrean/>: 
        posts.map(( post ) => <CardComponent key={post.id} post={post} />)
      }
    </div>
    
  );
}
