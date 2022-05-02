import React, { useRef, useState } from 'react'
import './AddElement.css'

import { markerIcons } from './marker_icons';
import { useAtom } from 'jotai';
import { addNewAtom, currentSvgAtom, elementTypeAtom, selectedIconAtom } from '../atoms';


const AddElement = React.memo(() => {
  const [elementType, setElementType] = useAtom(elementTypeAtom)
  const [, setAddNew] = useAtom(addNewAtom)
  const [, setCurrentSvg] = useAtom(currentSvgAtom)
  const [selectedIcon, setSelectedIcon] = useAtom(selectedIconAtom)
  // const [selectedIcon, setSelectedIcon] = useState()
  // const [selectedIcon, setSelectedIcon] = useState()
  const appRef = useRef(document.getElementsByClassName("app"))
  const mapRef = useRef(document.getElementsByClassName("mapboxgl-canvas-container"))

  const handleIconClick = (target, iconName) => {
    const svg = target.children[0]
    const cursorIcon = `url('data:image/svg+xml;utf8,${svg.outerHTML}'), auto`
    setCurrentSvg(svg)
    appRef.current[0].style.cursor = cursorIcon;
    mapRef.current[0].classList.remove("mapboxgl-interactive")
    if (!selectedIcon) {
      setSelectedIcon(target)
      target.classList.toggle("selected")
    } else {
      selectedIcon.classList.toggle("selected")
      target.classList.toggle("selected")
      setSelectedIcon(target)
    }
    addNewFn()
  }
  const addNewFn = () => { setAddNew(prev => !prev) }

  return (
    <div>
      <div className="select_type">
        <div className="element__type"
          onClick={() => setElementType("icon")}><span>Icon</span>
        </div>
        <div className="element__type"
          onClick={() => setElementType("text")}><span>Text</span>
        </div>
      </div>
      {(elementType === "text") && <div className="add__text">
        <button onClick={() => addNewFn()}>Add text</button></div>}
      {(elementType === "icon") &&
        <div className="add__icon">{
          markerIcons.map((icon, index) => <span className="icon__item" onClick={e => handleIconClick(e.currentTarget, icon)}
            key={icon.name + index.toString()}>{icon}
          </span>)}
        </div>
      }

    </div >
  )
})

export default AddElement