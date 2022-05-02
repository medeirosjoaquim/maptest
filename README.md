## Mapbox map creator

https://helpful-jelly-1d374a.netlify.app/

### Features 

- Adding icons to the map
- Adding texts to the map
- Deleting manually placed elements on the map
- Hiding and showing map layers
- Adjusting the map height/width in a given unit

### Sample

<img  height="350" src="./mapcreator.png"/>



### Todo/known issues 

* Improve the layers. The react-mapbox doesn't give access to setLayoutProperty, so I had to try a different way but it is not good.

* Add proper aria-labels

* Cancel add item. Let the user press Escape to cancel adding an item

* Add a central state using redux
