
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { layerVisibilityAtom } from '../atoms';
import './MapLayers.css'

const MapLayers = React.memo(() => {
  const layers = ['labels', 'roads', 'buildings', 'parks', 'water', 'background'];
  const [visible, setVisible] = useState(layers)
  const [hiddenLayers, setHiddenLayers] = useAtom(layerVisibilityAtom)
  const handleVisibility = (item, value) => {
    let update
    if (value) {
      update = [...visible, item]
    } else {
      update = [...visible.filter(layer => layer !== item)]
    }
    setVisible(update)
    setHiddenLayers(layers.filter(layer => visible.includes(layer)))
  }
  return (
    <div>
      <div>MapLayers</div>
      <div>
        <ul>
          {layers.map(item => <li
            className="layer__item"
            key={item}>
            <input
              type="checkbox"
              value={item}
              checked={visible.includes(item)}
              onChange={evt => handleVisibility(item, evt.target.checked)}
            />{item}</li>)}
        </ul>
      </div>
    </div>
  )
})

export default MapLayers