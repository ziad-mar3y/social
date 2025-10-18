import React, { useContext } from 'react'
import  { counterContext } from '../Contexts/CounterContext'

export default function Footer() {

  const {counter} = useContext(counterContext)
  console.log(counter);
  
    
  return (
    <>
      <h1 className='p-20 text-center bg-gray-700 mt-20'>Footer </h1>
    </>
  )
}
