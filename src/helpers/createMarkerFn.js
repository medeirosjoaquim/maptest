import { Marker } from "react-map-gl"
import { uid } from 'uid/secure';
import { TextMarker } from "../components/TextMarker";

export const createMarkerFn = (e, handlePopUp, setMarkers, elementType, appRef, svg) => {
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