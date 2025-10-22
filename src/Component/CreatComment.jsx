import { Button, Input, useDisclosure } from '@heroui/react'
import React from 'react'


export default function CreatComment({commentContent ,setCommentContent, isCommentSubmitted, handleComment}) {

  return (
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
            className="ms-auto"
          >
            Comment
          </Button>
        </div>
  )
}
