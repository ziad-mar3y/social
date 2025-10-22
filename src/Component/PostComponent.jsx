import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import Comment from "./Comment";
import Header from "./Post/Header";
import PostActions from "./Post/PostActions";
import PostBody from "./Post/PostBody";
import PostFooter from "./Post/PostFooter";
import { useContext, useState } from "react";
import { AddCommentApi } from "../Services/CommentsApi";
import { authContext } from "../Contexts/AuthContextProvider";
import { deletePostApi } from "../Services/PostsApi";
import CardDropdown from "./CardDropdown";
import CardModal from "./CardModal";

export default function PostComponent({ post, commentsLimit, callback }) {
  const [visableComments, setVisableComments] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  // const {id} = useParams()

  function handleMoreComments() {
    setIsLoading(true);
    setTimeout(() => {
      setVisableComments(visableComments + 3);
      setIsLoading(false);
    }, 300);
  }

  async function handleComment() {
    setIsCommentSubmitted(true);
    const response = await AddCommentApi(commentContent, post.id);
    await callback();
    setCommentContent("");
    setIsCommentSubmitted(false);
  }

  async function handleDeletePost(onClose) {
    setIsPostDeleted(true);
    const response = await deletePostApi(post.id);
    if (response.message == "success") {
      await callback();
      setIsPostDeleted(false);
      onClose();
      addToast({
        title: "delete successfully",
        timeout: 2000,
        color: "success",
      });
    }
  }

  return (
    <div className=" w-full flex flex-col mt-3   ">
      <div className=" bg-white w-full rounded-xl  shadow-lg/20 h-auto py-3 px-3  dark:bg-black9 border-1.5 dark:text-slate-100">
        <div className="w-full h-16 flex items-center  justify-between ">
          <Header
            avatar={post.user.photo}
            header={post.user.name}
            subheader={post.createdAt}
          />
          {post.user._id == userData._id && <CardDropdown onOpen={onOpen} />}
        </div>

        <PostBody capton={post.body} image={post.image} />

        <PostFooter numOfComments={post.comments.length} />

        <PostActions id={post.id} />
        <div className="flex justify-between gap-4 xs:flex-wrap sm:flex-nowrap">
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
          >
            Comment
          </Button>
        </div>
        {post.comments
          .slice(0, commentsLimit ?? visableComments)
          .map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onOpen={onOpen}
              callback={callback}
            />
          ))}
        {post.comments.length > visableComments && !commentsLimit && (
          <Button
            isLoading={isLoading}
            onPress={handleMoreComments}
            className="mx-auto block"
            variant="shadow"
          >
            Load More
          </Button>
        )}
      </div>
      <CardModal
        deleteFn={handleDeletePost}
        isLoading={isPostDeleted}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={"Delete Post"}
        description={"you cant get this post again !"}
      />
    </div>
  );
}
