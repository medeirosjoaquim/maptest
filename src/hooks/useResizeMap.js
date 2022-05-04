import { useEffect } from "react";

const useResizeMap = (width, height, mapRef) => {
  useEffect(() => {
    console.log(mapRef)
    // if (mapRef.current) {
    //   mapRef.current.resize()
    // }
  }, [width, height, mapRef]);
};

export default useResizeMap;