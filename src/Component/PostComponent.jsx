import { addToast, Button, useDisclosure } from "@heroui/react";
import Comment from "./Comment";
import Header from "./Post/Header";
import PostActions from "./Post/PostActions";
import PostBody from "./Post/PostBody";
import PostFooter from "./Post/PostFooter";
import { useContext, useState } from "react";
import { AddCommentApi, DeleteCommentApi, UpdateCommentApi } from "../Services/CommentsApi";
import { authContext } from "../Contexts/AuthContextProvider";
import CardDropdown from "./CardDropdown";
import CardModal from "./CardModal";
import CreatComment from "./CreatComment";
import { updatePostApi } from "../Services/PostsApi";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";

export default function PostComponent({ post, commentsLimit, callback , handleDeletePost }) {
  const [visableComments, setVisableComments] = useState(3);
  // const [isLoading, setIsLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPostDeleted, setIsPostDeleted] = useState(false);
 
  function handleMoreComments() {
    setIsLoading(true);
    setTimeout(() => {
      setVisableComments(visableComments + 3);
      setIsLoading(false);
    }, 300);
  }

  // async function handleComment() {
  //   setIsCommentSubmitted(true);
  //   const response = await AddCommentApi(commentContent, post.id);
  //   await callback();
  //   setCommentContent("");
  //   setIsCommentSubmitted(false);
  // }

  const {mutate:handleComment , isPending} = useMutation({
    mutationFn : ()=> AddCommentApi(commentContent , post.id ) ,
    onSuccess : (data)=> {
      setCommentContent("");
      setIsCommentSubmitted(false);
      queryClient.invalidateQueries(["posts"])
    },
    onError:(error)=>{
      console.log(error);
      
    }

  })

    async function handleDeleteComment(onClose , setIsCommentDeleted , commentId   ) {
      setIsCommentDeleted(true);
      const response = await DeleteCommentApi(commentId);
      if (response.message == "success") {
        await callback();
        onClose();
        setIsCommentDeleted(false);
        addToast({
          title: "Comment Deleted Successfully",
          color: "success",
          timeout: 2000,
        });
      }
    }

    
      async function updateComment(setIsUpdating ,commentId , newCommentContent ,setIsInUpdatingMood ) {
        setIsUpdating(true);
        const response = await UpdateCommentApi(commentId, newCommentContent);
        if (response.message == "success") {
          await callback();
          setIsInUpdatingMood(false);
        }
        setIsUpdating(false);
      }
    
      async function updatePost( postId ) {
        const response = await updatePostApi(postId)
        console.log(response);
        
      }

  return (
    <div className=" w-full flex flex-col mt-0   ">
      <div className=" bg-white w-full rounded-xl shadow-lg/20 h-auto py-3 px-3  dark:bg-black9  dark:text-slate-100">
        <div className="w-full h-16 flex items-center  justify-between ">
          <Header
            avatar={post.user.photo}
            header={post.user.name}
            subheader={post.createdAt}
          />
          {post?.user._id == userData._id && <CardDropdown onOpen={onOpen} updatePost={updatePost} post={post}/>}
        </div>

        <PostBody capton={post.body} image={post.image} />

        <PostFooter numOfComments={post.comments.length} />

        <PostActions id={post.id} />
        {/* <div className="flex justify-between gap-4 xs:flex-wrap sm:flex-nowrap">
          <Input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="comment . . . . . "
            variant="faded"
          />
          <Button
            isLoading={isCommentSubmitted}
            onPress={handleComment}
            variant="ghost"
            isDisabled={commentContent.trim().length < 2}
            className="ms-auto"
          >
            Comment
          </Button>
        </div> */}
        <CreatComment
          commentContent={commentContent}
          handleComment={handleComment}
          isCommentSubmitted={isPending}
          setCommentContent={setCommentContent}
        />
        {post.comments
          .slice(0, commentsLimit ?? visableComments)
          .map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onOpen={onOpen}
              callback={callback}
              handleDeleteComment={handleDeleteComment}
              updateComment={updateComment}
            />
          ))}
        {post.comments.length > visableComments && !commentsLimit && (
          <Button
            isLoading={isLoading}
            onPress={handleMoreComments}
            className="mx-auto block "
            variant="shadow"
          >
            Load More
          </Button>
        )}
      </div>
      <CardModal
        deleteFn={(onClose)=>handleDeletePost(onClose , setIsPostDeleted , post._id)}
        isLoading={isPostDeleted}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={"Delete Post"}
        description={"you cant get this post again !"}
      />
    </div>
  );
}
