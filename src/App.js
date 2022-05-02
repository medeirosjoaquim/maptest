import './App.css';
import AddElement from './components/AddElement';
import MapLayers from './components/MapLayers';
import MapDisplay from './components/MapDisplay/MapDisplay';
import { BiPlus } from 'react-icons/bi'
import { AiFillEye } from 'react-icons/ai'
import { useState } from 'react';
import { currentSvgAtom, mapRefAtom } from './atoms';
import { useAtom } from 'jotai';
import { BsPrinter } from 'react-icons/bs';
import html2canvas from 'html2canvas';

function App() {

  const ControlMenu = ({ control }) => {
    switch (control) {
      case "addElement":
        return <AddElement />
      case "mapLayers":
        return <MapLayers />
      default:
        return null
    }
  }
  const [mapWidth, setMapWidth] = useState(900)
  const [mapHeight, setMapHeight] = useState(700)
  const [currentSvg, setCurrentSvg] = useAtom(currentSvgAtom)
  const [mapRef] = useAtom(mapRefAtom)

  const [showControl, setShowControl] = useState(false)
  const [control, setControl] = useState(false)

  const handleChange = (field, value) => {
    if (field === "width") {
      setMapWidth(value)
    }
    if (field === "height") {
      setMapHeight(value)
    }
  }
  const handleMenuClick = controlValue => {
    if (controlValue === control && showControl) {
      setShowControl(false)
    } else {
      setControl(controlValue)
      setShowControl(true)
    }
  }
  const handleExport = () => {
    html2canvas(document.querySelector(".mapboxgl-map")).then(canvas => {
      const dataURL = canvas.toDataURL()
      const link = document.createElement("a");
      link.download = "mymap.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    // if (img) {
    //   window.saveAs();

    // }
    // const dataURL = mapRef.getCanvas().toDataURL()

  }

  return (
    <div className="app">
      <div className="hero">
        <div className="title">MapCreator</div>
      </div>
      <div className="map__dimensions">
        <div className="field">
          <div className="label"><span>Width:</span></div>
          <input
            type="range"
            min="100"
            max="2800"
            onChange={e => handleChange("width", e.target.value)}
            value={mapWidth} />
        </div>

        <div className="field">
          <div className="label"><span>Height:</span></div>
          <input
            type="range"
            min="100"
            max="2000"
            onChange={e => handleChange("height", e.target.value)}
            value={mapHeight} />
        </div>
      </div>
      <div className="controls__container">
        <div className="menu">
          <div className="menu__selector" onClick={() => handleMenuClick("addElement")}><BiPlus size={40} /></div>
          <div className="menu__selector" onClick={() => handleMenuClick("mapLayers")}><AiFillEye size={40} /></div>
          <div className="menu__selector" onClick={() => handleExport()}><BsPrinter size={40} /></div>
        </div>
        {showControl &&
          <div className="control"
          >
            <ControlMenu control={control} />
          </div>}
      </div>
      <div className="map__container">
        <MapDisplay
          width={mapWidth}
          height={mapHeight}
          currentIcon={currentSvg} />
      </div>
    </div>
  );
}

export default App;
