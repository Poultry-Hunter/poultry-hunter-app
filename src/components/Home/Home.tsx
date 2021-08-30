import React, { useEffect, useState } from "react";
import { Map } from "mapbox-gl";

import "./Home.css";

import { TestMap } from "../mapbox";

const Home = () => {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    setMap(TestMap("home-page-map"))
  }, []);

  return (
    <>
      <div id="home-page-map"></div>
      <div className="home-navbar-wrapper">
        <div className="home-navbar">
          <div className="home-navbar-logo"></div>
          <div className="home-navbar-navigations"></div>
          <div className="home-navbar-dash-dropdown"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
