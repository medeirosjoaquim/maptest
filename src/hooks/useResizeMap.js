import { useEffect } from "react";

const useResizeMap = (width, height, mapRef) => {
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize()
    }
  }, [width, height, mapRef]);
};

export default useResizeMap;