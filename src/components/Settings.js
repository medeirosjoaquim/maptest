import React, { useState } from 'react'

import './Settings.css'
const Settings = ({ changeCallback }) => {
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(400)
  const maxVal = 1200
  const handleChange = (field, value) => {
    if (value > maxVal) {
      value = maxVal
    }
    if (field === "width") {
      setWidth(value)
    }
    if (field === "height") {
      setHeight(value)
    }
    changeCallback(field, value)
  }

  return (
    <div>
      <div className="field">
        <div className="label"><span>Width:</span></div>
        <input
          type="range"
          min="200"
          max="1200"
          onChange={e => handleChange("width", e.target.value)}
          value={width} />
      </div>

      <div className="field">
        <div className="label"><span>Height:</span></div>
        <input
          type="range"
          min="200"
          max="1200"
          onChange={e => handleChange("height", e.target.value)}
          value={height} />
      </div>
    </div>
  )
}

export default Settings