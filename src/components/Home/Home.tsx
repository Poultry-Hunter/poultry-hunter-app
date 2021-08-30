import React, { useEffect, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import {useDispatch} from "react-redux";

import "./Home.css";

import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Link } from "react-router-dom";
import { TestMap } from "../mapbox";

const Home = () => {
  const [map, setMap] = useState<Map>();
  const dispatch = useDispatch();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FpcmFqazE5IiwiYSI6ImNrc3hiMTkwcTBhdWQybnAyZnJjZmYybHkifQ.RaD2tnWTR8vjk4Q20zDTzQ";

    const mapBox = new mapboxgl.Map({
      container: "home-page-map", // container ID
      style: "mapbox://styles/mapbox/light-v10", // style URL
      center: [73.792318, 15.583988], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    setMap(mapBox);
    // dispatch()
    console.log(mapBox);
    const map = TestMap("map");
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
