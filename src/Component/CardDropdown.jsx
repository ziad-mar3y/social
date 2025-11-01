import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import React from 'react'

export default function CardDropdown({onOpen , setIsInUpdatingMood , updatePost ,post}) {
  return (
        <Dropdown className=' ' >
              <DropdownTrigger>
                <svg
                  className="w-fit outline-0 cursor-pointer "
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
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem onPress={ () =>updatePost(post._id)} key="edit">Edit </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={onOpen}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
  )
}
