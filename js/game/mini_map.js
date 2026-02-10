///////////////////* Mini Map with Leaflet *////////////////////

function getLatLng(event) {
  'use strict';
  console.log('%d.5, %d.5', event.latlng.lat, event.latlng.lng);
}

function createMiniMap() {
  'use strict';
  let miniMap = L.map('miniMap', {
    center: [0, 0],
    zoom: 0,
    minZoom: 0,
    maxZoom: 0,
    zoomControl: false,
    attributionControl: false,
    crs: L.CRS.Simple,
  });
  let miniMapLayer = L.tileLayer('assets/UI/map_2.png', {
    minZoom: 0,
    maxZoom: 0,
  });
  miniMap.addLayer(miniMapLayer);
  miniMap.on('click', getLatLng);
}
