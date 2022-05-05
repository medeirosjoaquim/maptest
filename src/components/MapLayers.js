
import { useAtom } from 'jotai';
import React, { useEffect } from 'react'
import { mapRefAtom } from '../atoms';
import './MapLayers.css'

const MapLayers = React.memo(() => {
  const layers = ['water', 'background'];
  const [map] = useAtom(mapRefAtom)

  useEffect(() => {
    layers.forEach(layer => {
      map.getMap().setLayoutProperty(layer, 'visibility', 'visible');
    });
  })

  const toggleVisibility = layer => {
    const visibility = map.getLayoutProperty(
      layer,
      'visibility'
    );
    if (visibility === 'visible') {
      map.getMap().setLayoutProperty(layer, 'visibility', 'none');
    } else {
      map.getMap().setLayoutProperty(
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