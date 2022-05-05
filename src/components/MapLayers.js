
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { layerVisibilityAtom, mapRefAtom } from '../atoms';
import './MapLayers.css'

const MapLayers = React.memo(() => {
  const layers = ['water', 'background'];
  const [map] = useAtom(mapRefAtom)
  const [visible, setVisible] = useState(layers)

  useEffect(() => {
    layers.forEach(layer => {
      map.getMap().setLayoutProperty(layer, 'visibility', 'visible');
    });
    console.log(map.getMap())
  }, [])

  const toggleVisibility = layer => {
    const visibility = map.getLayoutProperty(
      layer,
      'visibility'
    );
    console.log(layer, visibility)
    if (visibility === 'visible') {
      map.setLayoutProperty(layer, 'visibility', 'none');
    } else {
      map.setLayoutProperty(
        layer,
        'visibility',
        'visible'
      );
    }
  }



  return (
    <div>
      <div>MapLayers</div>
      <div>
        <ul>
          {layers.map(item => <li
            className="layer__item"
            key={item}>
            <button className="toggle__visibility__btn" onClick={() => toggleVisibility(item)}
            >{item}</button></li>)}
        </ul>
      </div>
    </div>
  )
})

export default MapLayers