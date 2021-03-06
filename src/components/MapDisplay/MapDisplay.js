import { useAtom } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import Map, { Popup } from 'react-map-gl'
import { addNewAtom, elementTypeAtom, mapRefAtom } from '../../atoms'
import useCreateMarker from '../../hooks/useCreateMarker'
import useResizeMap from '../../hooks/useResizeMap'
import MAP_STYLE from '../../mapstyle.json';
import './MapDisplay.css'

const MapDisplay = ({ width, height, currentIcon }) => {
  const mapRef = useRef()
  const [markers, setMarkers] = useState([])
  const [popup, setPopup] = useState(null)
  const [elementType] = useAtom(elementTypeAtom)
  const [, setMapRef] = useAtom(mapRefAtom)

  const [addNew] = useAtom(addNewAtom)
  const defaultMapStyle = MAP_STYLE
  const [mapStyle] = useState(defaultMapStyle)
  useResizeMap(width, height, mapRef)
  useCreateMarker(mapRef, elementType,
    currentIcon, setMarkers, setPopup, addNew)
  const removeMarker = id => {
    setMarkers(prev => [...prev.filter(item => item.id !== id)])
    setPopup(null)
  }
  useEffect(() => {
    setTimeout(() => {
      if (mapRef.current) {
        setMapRef(mapRef.current)
      }
    }, 200);
  })

  return (
    <div className="map-display__scrollable">
      <div className="wrapper"
        style={{
          width: Number(width), height: Number(height)
        }}>
        <Map
          ref={mapRef}
          trackResize={true}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 7,
            preserveDrawingBuffer: true

          }}
          mapStyle={mapStyle}
        >
          {markers.map(marker => <span key={marker.id}>{marker.component}</span>)}
          {popup && <Popup
            className="popup__item"
            latitude={Number(popup.lat)}
            longitude={Number(popup.lng)}
            onClose={() => setPopup(null)}>
            <div className="txt-center"><span className="sub-title">Delete marker?</span></div>
            <div className="popup__item_container">
              <div className="popup__item_option"><button className="danger" onClick={() => removeMarker(popup.id)}>Yes</button></div>
              <div className="popup__item_option"><button onClick={() => setPopup(null)}>Cancel</button></div>
            </div>
          </Popup>}
        </Map>
      </div>
    </div >
  )
}

export default MapDisplay