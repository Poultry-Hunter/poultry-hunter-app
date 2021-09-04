import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./mapbox.css";

import mapboxgl, { Map } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const ArcGisMap = () => {

  return (
    <div className="embed-container">
      <iframe 
        width="100%" 
        height="100%" 
        scrolling="no" 
        title="Poultry Hunter" 
        src="//www.arcgis.com/apps/Embed/index.html?webmap=cb84c7c8fb3f4c2e83606cb2bd6596e0&extent=73.8062,15.4569,73.8379,15.4749&home=true&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&disable_scroll=true&theme=light"
      >
      </iframe>
    </div>
  );
};

export function TestMap(container_id: string) {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2FpcmFqazE5IiwiYSI6ImNrc3hiMTkwcTBhdWQybnAyZnJjZmYybHkifQ.RaD2tnWTR8vjk4Q20zDTzQ";

  const mapBox = new mapboxgl.Map({
    container: container_id, // container ID
    style: "mapbox://styles/mapbox/light-v10", // style URL
    center: [73.792318, 15.583988], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
  mapBox.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapBox,
    })
  );

  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  });

  mapBox.addControl(geolocate);

  return { map: mapBox, geolocation: geolocate };
}
