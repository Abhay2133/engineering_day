import React from 'react'

const footer = () => {
  return (
    <div>
      <div className='bg-black'>
        <div className='text-white text-center p-4 text-4xl font-semibold'>Contact Us At :</div>
        <div className='text-white text-center text-xl  '>Faculty Coordinator :</div>
        <div className='md:flex-row flex flex-col md:gap-3 justify-center items-center'>
        <div className='text-white text-center text-lg '>Dr Madhu Kirola</div>
        <div className='text-white'>(Head of Department,CSE)</div>
        </div>
        <div className='md:flex-row mt-1 flex flex-col md:gap-3 justify-center items-center'>
        <div className='text-white text-center text-lg '>Mr Awadhesh Chandramauli</div>
        <div className='text-white'>(Head of Department,CE)</div>
        </div>
        <div className='text-white text-center text-xl mt-8 '>Student Coordinator:</div>
        <div className='md:flex-row flex flex-col md:gap-3 justify-center items-center'>
        <div className='text-white text-center text-lg '>Vansh Taneja</div>
        <div className='text-white'>(B.TECH CSE 4th year)</div>
        </div>
        <div className='md:flex-row mt-1 flex flex-col md:gap-3 justify-center items-center'>
        <div className='text-white text-center text-lg '>Mr Awadhesh Chandramauli</div>
        <div className='text-white'>(B.TECH CSE 3rd year)</div>
        </div>
        <div className='text-white text-center mt-8 text-lg'>&copy; 2024 Engineers Day. All rights reserved.</div>
        <div className='md:text-2xl mt-6 pb-4 text-white text-center'>Site Created by: <br className='md:hidden'/> Swati Mishra,<br className='md:hidden'/> Abhay Bisht, <br className='md:hidden'/> Vansh Gambhir</div>
      </div>
    </div>
  )
}

export default footer
