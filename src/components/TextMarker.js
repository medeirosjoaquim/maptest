import React, { useRef, useState } from 'react'
import './TextMarker.css'
export const TextMarker = ({ closeCallback }) => {
  const [text, setText] = useState("")
  const [editmode, setEditmode] = useState(true)

  const inputRef = useRef()
  const handleChange = value => {
    setText(value)
  }
  const handleFocus = () => {
    setEditmode(true)
    setTimeout(() => {
      inputRef.current.focus()
    }, 100);
  }
  const handleClose = e => {
    e.stopPropagation()
    closeCallback()

  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      inputRef.current.blur()
    }
  }

  return (
    <div className="text_marker__container"
      onClick={() => handleFocus()}
      onBlur={() => setEditmode(false)}>
      {editmode && <input value={text}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        onChange={e => handleChange(e.target.value)}
      />}
      {!editmode && <p className="text_marker__text">{text}</p>}
      <div className="close" onClick={e => handleClose(e)}><p>x</p></div>
    </div>
  )
}
