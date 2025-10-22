import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Contexts/AuthContextProvider";
import { getUserProfile } from "../../Services/PostsApi";
import Header from "../../Component/Post/Header";
import CardDropdown from "../../Component/CardDropdown";
import PostBody from "../../Component/Post/PostBody";
import PostFooter from "../../Component/Post/PostFooter";
import PostActions from "../../Component/Post/PostActions";
import { Button, Input } from "@heroui/react";
import LoadingScrean from "../LoadingScrean/LoadingScrean";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const { userData } = useContext(authContext);
  const userId = userData?._id;
  const [profile, setProfile] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false)

  // async function getUserData() {
  //   setIsPageLoading(true)
  //   const data = await getUserProfile(userId);
  //   setProfile(data);
  //   setIsPageLoading(false)
  // }

  // useEffect(() => {
  //   getUserData();
  // }, [userId]);

const {data , isLoading , isFetching  } = useQuery({
  queryKey:["userPosts" , userId ],
  queryFn:()=> getUserProfile(userId),
  enabled: !!userId, // wait until userId exists
  
})



  return (
    <>
     {isLoading ? <LoadingScrean/> : <div className="grid  max-w-2xl mx-auto   gap-2 mt-2">
        <div className="w-full flex flex-col mt-0  gap-2">
        {data?.data.posts?.map((post) => (
            <div key={post.id} className=" bg-white w-full rounded-xl shadow-lg/20 h-auto py-3 px-3  dark:bg-black9  dark:text-slate-100">
        <div className="w-full h-16 flex items-center  justify-between ">
          <Header
            avatar={post.user.photo}
            header={post.user.name}
            subheader={post.createdAt}
          />
         <CardDropdown />
        </div>

        <PostBody capton={post.body} image={post.image} />

        <PostFooter numOfComments={post.comments.length} />

        <PostActions id={post.id} />
        <div className="flex justify-between gap-4 xs:flex-wrap sm:flex-nowrap">
          <Input
            // value={commentContent}
            // onChange={(e) => setCommentContent(e.target.value)}
            placeholder="comment . . . . . "
            variant="faded"
          />
          <Button
            // isLoading={isCommentSubmitted}
            // onPress={handleComment}
            variant="ghost"
            // isDisabled={commentContent.trim().length < 2}
            className="ms-auto"
          >
            Comment
          </Button>
        </div>
        {/* {post.comments
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
            className="mx-auto block "
            variant="shadow"
          >
            Load More
          </Button>
        )} */}
      </div>
        ))}
      </div>
      </div>}
    </>
  );
}
