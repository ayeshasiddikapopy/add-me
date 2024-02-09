import gsap from 'gsap'
import React, { useEffect } from 'react'

const Navbar = () => {
  useEffect(()=>{

    gsap.fromTo('.logo',{
      scale:.3,
      ease:'elastic.inOut',
      duration:1
    },
    {
      scale:1
    })
  },[])
  return (
    <>
        <div className="logo p-4 bg-slate-400 flex justify-center mx-0 ">
            <h1 className='text-lg text-white logo' >addMe</h1>
        </div>
    </>
  )
}

export default Navbar