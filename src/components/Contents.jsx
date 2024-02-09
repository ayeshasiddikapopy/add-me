import React, { useEffect, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { getDatabase, push, ref, set , onValue, remove, update} from "firebase/database";
import { CiCircleCheck , CiEdit } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import Error from './Error';
import gsap from 'gsap';


const Contents = () => {
  const db = getDatabase();
  let [input, setInput] = useState("")
  let [input2, setInput2] = useState("")
  let [add, setAdd] = useState([])
  let [UpdateID, setUpdateId] = useState("")
  let [show, setShow] = useState(false)
  let [showUpdate, setShowUpdate] = useState(false)
  let [error, setError] = useState('')
  //input-->>

  let handleChange = (e) => {
    setInput(e.target.value)
    console.log(e.target.value)
    setError('')
  }

  let handleChange2 = (e) => {
    setInput2(e.target.value)
  }


  // add button-->>

  let handleAdd = (e) => {
    if(input == ''){
      setError('error happend')
      console.log(error)
    }else {
    set(push(ref(db, 'users/')), {
      values: input
    }).then(()=>{
      setInput('')

    })
  }
  }

  // create data--->>
  useEffect(()=> {

    const dataRef = ref(db, 'users/' );

    onValue(dataRef, (snapshot) => {

      let arr = []

      snapshot.forEach((item) => {
        arr.push({...item.val(),id: item.key})
      })

      setAdd(arr)
    });
  },[])


  // edit--->>
  let  handleUpdate = () => {

    update(ref(db,'users/' + UpdateID),{
      values:input2
    }).then(()=>{
      setShowUpdate(false)
      setInput2('')
    })
    setShow(false)
  }
  //update--->>
  let handleEdit = (items) => {
    setShow(true)
    setUpdateId(items.id)
    setShowUpdate(!showUpdate)
  }

  // delet--->>
  let handleDelet = (id) => {

    remove(ref(db, "users/" + id)).then(()=> {
      console.log('delet')
    })

  }
  useEffect (()=>{

    gsap.fromTo(".box", 
    { yPercent: -100 }, 
    {yPercent: 5,
      duration: 1 ,
      ease: "elastic" 

    });
    gsap.fromTo(".box_List", 
    { yPercent: -110 }, 
    {yPercent: 5,
      duration: 1.2 ,
      ease: "elastic" ,
      delay: .5
    });

    

  },[])
  

  
  return (
    <>
        <div className='w-[1240px] mx-auto'>
          <div className="w-[400px] mx-auto">
          <div className="flex items-center pt-4 justify-center w-full box">
              <form >
                  { showUpdate ?
                  <>
                    <input type="text" className='border-2 border-stone-500 rounded-lg px-3 py-2' onChange={handleChange2} value={input2} placeholder='Enter to update '/>
                  </>
                  :
                  <>
                    <input type="text" className='border-2 border-stone-500 rounded-lg px-3 py-2 w-full' onChange={handleChange} value={input} placeholder='Enter '/>
                  </>
                  }
              </form>
              {
                show 
                ?
                <div className=" ml-3 rounded-[50%]">
                   <CiCircleCheck className='text-[30px] inline-block text-cyan-700 cursor-pointer' onClick={handleUpdate}/>
                </div>
                :
                (
                  error
                   ?
                   <div className=" ml-3 rounded-[50%]">
                   <IoIosCloseCircleOutline className='text-[30px] inline-block cursor-pointer'/>
                  </div> 
                  :
                  <div className=" ml-3 rounded-[50%]">
                    <CiCirclePlus className='text-[30px] inline-block cursor-pointer' onClick={handleAdd}/>
                  </div> 
                )
               
              }
              
          </div>
          <div className=''>
            <ul>
              {add.map((item,index)=> (
               
              <li key={index} className='m-2 ml-0 p-2 bg-slate-400  flex justify-between rounded-lg text-white text-lg box_List'>               
              <a href="">{item.values}</a>
               <div className='flex'>
                  <div className=" ml-3 rounded-[50%]">
                      <CiEdit className='text-[30px] inline-block text-black cursor-pointer' onClick={() => handleEdit(item)}/>
                    </div>
                    <div className=" ml-3 rounded-[50%]">
                      <TiDelete className='text-[30px] inline-block text-[#A25772] cursor-pointer' onClick={() => handleDelet(item.id)}/>
                   </div>
               </div>
              </li>
              ))
              }
            </ul>
          </div>

          </div>
        </div>
        
    </>
  )
}

export default Contents