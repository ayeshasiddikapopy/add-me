import React from 'react'

const Error = ({children}) => {
    return (
      <>
          <div className='my-4 py-2.5 px-2 border border-red-100 border-solid rounded-lg  mx-auto md:text-[12px] text-[10px] text-red-500 mb-3'>{children}</div>
      </>
    )
  }

export default Error