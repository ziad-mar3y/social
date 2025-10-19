import { Button, Input } from "@heroui/react";
import Comment from "./Comment";
import Header from "./Post/Header";
import PostActions from "./Post/PostActions";
import PostBody from "./Post/PostBody";
import PostFooter from "./Post/PostFooter";
import { useState } from "react";

export default function PostComponent({ post, commentsLimit  }) {
  const [visableComments, setVisableComments] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  function handleMoreComments() {
    setIsLoading(true);

    setTimeout(() => {
      setVisableComments(visableComments + 3);
      setIsLoading(false);
    }, 300);
  }

// async function handleComment(){

//   }
  return (
    <div className=" w-full flex flex-col mt-3   ">
      <div className=" bg-white w-full rounded-xl  shadow-lg/20 h-auto py-3 px-3  dark:bg-black9 border-1.5 dark:text-slate-100">
        <div className="w-full h-16 flex items-center  justify-between ">
          <Header
            avatar={post.user.photo}
            header={post.user.name}
            subheader={post.createdAt}
          />
          <svg
            className="w-16"
            xmlns="http://www.w3.org/2000/svg"
            width={27}
            height={27}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            strokeWidth={2}
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={1} />
            <circle cx={19} cy={12} r={1} />
            <circle cx={5} cy={12} r={1} />
          </svg>
        </div>

        <PostBody  capton={post.body} image={post.image}  />

        <PostFooter numOfComments={post.comments.length} />

        <PostActions id={post.id} />
        <div className="flex justify-between gap-4 xs:flex-wrap sm:flex-nowrap">
          <Input placeholder="comment" variant="faded" />
          <Button  variant="ghost" >Comment</Button>
        </div>
        {post.comments
          .slice(0, commentsLimit ?? visableComments)
          .map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
    { post.comments.length > visableComments && !commentsLimit &&  <Button
          isLoading={isLoading}
          onPress={handleMoreComments}
          className="mx-auto block"
          variant="shadow"
        >
          Load More
        </Button>}
      </div>
    </div>
  );
}
