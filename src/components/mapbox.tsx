import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./mapbox.css";

import mapboxgl, { Map } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const ReactMap = () => {
  let [viewport, setViewport] = useState({
    latitude: 15.583988,
    longitude: 73.792318,
    zoom: 9,
    width: window.innerWidth,
    height: window.innerHeight,
    pitch: 50,
  });

  return (
    <ReactMapGL
      //mapStyle={"mapbox://styles/msanket9/ckswt7lqw7ecu18lj5dwff5az"}
      mapboxApiAccessToken={
        "pk.eyJ1Ijoic2FpcmFqazE5IiwiYSI6ImNrc3hiMTkwcTBhdWQybnAyZnJjZmYybHkifQ.RaD2tnWTR8vjk4Q20zDTzQ"
      }
      {...viewport}
      onViewportChange={(newView: any) => setViewport(newView)}
    >
      <Marker
        latitude={15.472357}
        longitude={73.81095}
        offsetTop={(-viewport.zoom * 5) / 2}
      >
        <img
          src="../assets/images/vector-art/directContact.svg"
          width={viewport.zoom * 5}
          height={viewport.zoom * 5}
        />
      </Marker>
    </ReactMapGL>
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
