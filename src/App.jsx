import { useState, useEffect, useCallback,useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(8)
  const [SChar, setSChar] = useState(false)
  const [Nums, setNums] = useState(false)
  const [PassWord, setPassWord] = useState('')

  const GeneratePass = useCallback(() => {
    let RawStr = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    if (SChar) {
      RawStr += '!@#$%^&*-=<>?'
    }

    if (Nums) {
      RawStr += '0123456789'
    }

    let GeneratedPass = ''
    for (let index = 0; index < count; index++) {
      let chooseindex = Math.floor(Math.random() * ((RawStr.length - 1) - 0) + 0);
      console.log(chooseindex);
      console.log(RawStr[chooseindex]);

      GeneratedPass += RawStr[chooseindex]
    }
    setPassWord(GeneratedPass);
  }, [count, SChar, Nums, setPassWord])

  useEffect(() => (GeneratePass()), [count, SChar, Nums, GeneratePass]);

  const PassRef = useRef(null)
  const Paste = () => {
    PassRef.current?.select();
    window.navigator.clipboard.writeText(PassWord)
  }

  return (
    <>
      <div id='main'>
        <div className='PassWordCoonainer'>
          <input type="text" className="pass" value={PassWord} ref={PassRef} readOnly />
          <button className='copy' onClick={Paste} >Copy</button>
        </div>
        <div className='container'>
          <div className='container ckb' onClick={() => (setSChar((SChar) => !SChar))}>
            <label className='elements' htmlFor="aa">Special Character</label>
            <input className='elements checkBox' checked={SChar} type="checkbox" name="aa"  />
          </div>

          <div className='container ckb' onClick={() => (setNums((Nums) => !Nums))}>
            <label className='elements' htmlFor="bb">Numbers</label>
            <input className='elements checkBox' checked={Nums} type="checkbox" name="bb" />
          </div>
        </div>
        <div className='slider'>
          <p className='elements'>Length {count} </p>
          <input className='elements' id='dlid' type="range" min={8} max={50} value={count} onChange={(e) => (setCount(e.target.value))} />
        </div>
        <div className='container'>
          <button className='reset' onClick={GeneratePass}>Re-generate</button>
        </div>


      </div>
    </>
  )
}

export default App
