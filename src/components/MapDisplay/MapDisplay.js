import { useAtom } from 'jotai'
import mapboxgl from 'mapbox-gl'
import React, { useEffect, useRef, useState } from 'react'
import Map, { Popup } from 'react-map-gl'
import { addNewAtom, elementTypeAtom, layerVisibilityAtom, mapRefAtom } from '../../atoms'
import useCreateMarker from '../../hooks/useCreateMarker'
import useResizeMap from '../../hooks/useResizeMap'
import MAP_STYLE from '../../mapstyle.json';
import './MapDisplay.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obmJveGNvZGVzIiwiYSI6ImNqaHR2bmVlajBpNHAzcXBkMDB3NnFqa2QifQ.bC7SkLPUeaTA2MnNWW2-gw';

const MapDisplay = ({ width, height, currentIcon }) => {
  // const mapRef = useRef()
  let mapRef
  const [markers, setMarkers] = useState([])
  const [popup, setPopup] = useState(null)
  const [elementType] = useAtom(elementTypeAtom)
  const [, setMapRef] = useAtom(mapRefAtom)
  const [hiddenLayers] = useAtom(layerVisibilityAtom)

  const [addNew] = useAtom(addNewAtom)
  const defaultMapStyle = MAP_STYLE
  const defaultLayers = defaultMapStyle.layers
  const [mapStyle, setMapStyle] = useState(defaultMapStyle)
  // useCreateMarker(mapRef, elementType,
  //   currentIcon, setMarkers, setPopup, addNew)
  const removeMarker = id => {
    setMarkers(prev => [...prev.filter(item => item.id !== id)])
    setPopup(null)
  }
  useEffect(() => {
    if (hiddenLayers) {
      const visibleLayers = defaultLayers.filter(layer => !hiddenLayers.includes(layer.id))
      const style = { ...defaultMapStyle, layers: visibleLayers }
      setMapStyle(style)
    }
    setTimeout(() => {
      if (mapRef.current) {
        setMapRef(mapRef.current)
      }
    }, 200);


     mapRef = new mapboxgl.Map({
      container: "mymap",
      style: "mapbox://styles/mapbox/light-v9",
      zoom: 12,
      center: [-122.447303, 37.753574]
    });
// process.env.REACT_APP_FIREBASE_API_KEY,
  }, [hiddenLayers])

  return (
    <div className="map-display__scrollable">
      <div className="wrapper"
        style={{
          width: Number(width), height: Number(height)
        }}>
              <div id="mymap"  ref={mapRef} style={{ height: "100%", width: "100%" }}></div>

        {/* <Map
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
        </Map> */}
      </div>
    </div >
  )
}

export default MapDisplay