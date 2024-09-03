import React from 'react'

const Faq = (props) => {
  return (
  <div className='bg-white h-[29vh] flex flex-col gap-4 items-center justify-center mx-2 rounded-3xl'>
      <div className='font-semibold  p-2  text-2xl'>{props.ques}</div>
      <div className='font-sans text-center p-2 text-xl'>{props.ans}</div>
    </div>
  )
}

export default Faq
