import { useContext, useState } from "react";
import userPhoto from "../../src/assets/OIP.webp";
import { authContext } from "../Contexts/AuthContextProvider";
import {  Button, Input, useDisclosure } from "@heroui/react";
import CardDropdown from "./CardDropdown";
import CardModal from "./CardModal";

export default function Comment({ comment ,handleDeleteComment ,updateComment }) {
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [newCommentContent, setNewCommentContent] = useState(comment.content);
  const [isInUpdatingMood, setIsInUpdatingMood] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);


  return (
    <div className="">
      <div className="flex justify-between mt-4">
        <div className="flex  ">
          {
            <img
              onError={(e) => (e.target.src = userPhoto)}
              className=" rounded-full w-10 h-10 mr-3"
              src={comment?.commentCreator.photo}
              alt={"asdfasdf"}
            />
          }
          <div>
            <h3 className="text-md font-semibold ">
              {comment?.commentCreator.name}
            </h3>
            <p className="text-xs text-gray-500">{comment?.createdAt}</p>
          </div>
        </div>

        {comment.commentCreator._id == userData._id && (
          <CardDropdown
            onOpen={onOpen}
            setIsInUpdatingMood={setIsInUpdatingMood}
          />
        )}
      </div>

      {isInUpdatingMood ? (
        <div className="ps-12 pe-3 mt-2  flex-1">
          <Input
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="bordered"
              color="default"
              onPress={() => setIsInUpdatingMood(false)}
            >
              Cancel
            </Button>
            <Button
              onPress={()=> updateComment(setIsUpdating, comment._id , newCommentContent , setIsInUpdatingMood) }
              isLoading={isUpdating}
              color="primary"
            >
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <div className="ps-12 pe-3 mt-2 ">
          <p>{comment?.content}</p>
        </div>
      )}

      <CardModal
        deleteFn={(onClose)=> handleDeleteComment(onClose , setIsCommentDeleted , comment._id )}
        isLoading={isCommentDeleted}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={"Delete Comment"}
        description={"you cant get this Comment again !"}
      />
    </div>
  );
}
