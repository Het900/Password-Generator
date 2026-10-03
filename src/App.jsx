import { useCallback ,useEffect,useRef} from 'react'
import { useState } from 'react'
import React from 'react'

const App = () => {
  const [len,setlen]=useState(8)
  const [numallowed,setnumallowed]=useState(false)
  const [charallowed,setcharallowed]=useState(false)
  const [pass,setpass]=useState("")

  //useRef hook
  const passref=useRef(null)

  //callback is optional , if not using then dont put it and dependency
  const passGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed)  str+="0123456789"
    if(charallowed) str+="!@#$%^&*(){}[]_+-=`~"

    for(let i=0;i<len;i++){
      let char=Math.floor(Math.random()*str.length)
      pass+=str.charAt(char)
    }

    setpass(pass)


  },[len,numallowed,charallowed,setpass])
  

  const copyPasswordToClipboard = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(pass)
  },[pass])
  
  useEffect(()=>{
    passGenerator()
  },[len,numallowed,charallowed,passGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-700'>
        <h1 className='text-white text-center pt-4 pb-4 text-3xl'>Password Generator</h1>
        <div className='bg-white text-gray-700 flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={pass}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passref}
          ></input>
          
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer'
          >copy</button>
        
        </div>
        <div className='flex text-sm gap-x-2 pb-4'>
          <div className='flex items-center gap-x-2 pr-7'>
            <input
            type='range'
            min={6}
            max={100}
            value={len}
            className='cursor-pointer accent-orange-400'
            onChange={(e)=>{
              setlen(e.target.value)
            }}></input>
            <label>length : {len}</label>
          </div>
          <div className='flex items-center gap-x-1 pr-3'>
              <input
              type='checkbox'
              defaultChecked={numallowed}
              id='numberInput'
              onChange={()=>{
                setnumallowed((prev)=>!prev)
              }}></input>
              <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input
              type='checkbox'
              defaultChecked={charallowed}
              id='charInput'
              onChange={()=>{
                setcharallowed((prev)=>!prev)
              }}></input>
              <label htmlFor='charInput'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App