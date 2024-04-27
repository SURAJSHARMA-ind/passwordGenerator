import { useEffect, useState ,useRef } from 'react'
import './App.css'

function App() {
  const [pass, setPass] = useState("")
  const [passLength, setPassLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [special, setSpecial] = useState(false)
  const passRef =useRef()

  const passgenerator = () => {
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let str = alphabets;
    let pass = ""
    if (number) {
      str += "0123456789"
    }
    if (special) {
      str += "./?!@#$%^&*|\/><"
    }
    for (let i = 0; i < passLength; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(index)
      setPass(pass)
    }
  }

  useEffect(() => {
    passgenerator()
  }, [])

  useEffect(() => {
    passgenerator()
  }, [number, special, passLength])

  const copyPassword =()=>{
    window.navigator.clipboard.writeText(pass)
    passRef.current?.select()
    
  }

  const numClickHandler = () => {
    setNumber(!number)
  }

  const specClickHandler = () => {
    setSpecial(!special)
  }
  return (
    <>
      <div className="min-h-screen text-black bg-black flex justify-center items-center">
        <div className="container border-transparent bg-gray-800 p-4 rounded-lg w-1/2">
          <h1 className=" text-2xl   text-white mb-4">Basic Password Generator</h1>
          <div className='flex'>
          <input ref={passRef} className="mt-2 mb-4 p-2 w-full rounded border" type="text" readOnly value={pass} />
          <button  onClick={copyPassword} className='bg-blue-500 hover:bg-blue-700 text-white font-bold  h-11 mt-2 mx-2 px-4  rounded'>Copy</button>
          </div>
          <div className="flex items-center mb-4  text-orange-400">
            <input className='w-1/3' onChange={(e) => { setPassLength(e.target.value); }} value={passLength} min={8} max={20} step={1} defaultValue={10} type="range" />
            <label className="ml-2" htmlFor="length">Password Length is {passLength}</label>
          </div>
          <div className="flex items-center text-orange-400">
            <input onChange={numClickHandler} type="checkbox" className="mr-2" name="number" id="number" />
            <label htmlFor="number">Include Numbers</label>
          </div>
          <div className="flex items-center text-orange-400 mt-2">
            <input onChange={specClickHandler} type="checkbox" className="mr-2" name="special" id="special" />
            <label htmlFor="special">Include Special Characters</label>
          </div>
        </div>
      </div>
    </>)
}

export default App