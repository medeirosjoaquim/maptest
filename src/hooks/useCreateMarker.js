import { useEffect, useRef, useState } from "react";
import { uid } from 'uid/secure';
import { Marker } from "react-map-gl";
import { TextMarker } from "../components/TextMarker";

const useCreateMarker = (mapRef, elementType, svg, setMarkers, setPopup, addNew) => {
  const handlePopUp = (id, lat, lng) => {
    setPopup(id, lat, lng)
  }
  const appRef = useRef(document.getElementsByClassName("app"))
  const createMarkerFn = (e) => {
    const { lat, lng } = e.lngLat
    const id = uid()
    const element = <Marker
      latitude={lat}
      longitude={lng}
      onClick={e => {
        if (elementType === "text") {
          return
        }
        e.originalEvent.stopPropagation();
        handlePopUp({ id, lat, lng })
      }}
    >
      {elementType === "icon" &&
        <div className="marker__item"><img src={`data:image/svg+xml;utf8,${svg.outerHTML}`} alt="map marker" /></div>
      }
      {elementType === "text" &&
        <TextMarker closeCallback={() => handlePopUp({ id, lat, lng })} />
      }
    </Marker>
    setMarkers(prev => [...prev, {
      id, component: element, type: elementType
    }])
    appRef.current[0].style.cursor = "pointer";
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.once('click', createMarkerFn)
    }

  }, [addNew])
  // [svg, elementType, addNew]
  // [addNew]
};

export default useCreateMarker;