import React, { useState, useEffect } from "react";
// import mapboxgl from 'mapbox-gl';
// const mapboxgl = require("mapbox-gl");
import mapboxgl, { Map } from "mapbox-gl";

import "./GettingStarted.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Icons and Vectors.
import starman from "../../assets/images/vector-art/starman.svg";
import close from "../../assets/images/icons/close.svg";

import { TestMap } from "../mapbox"

const GettingStarted = () => {
  const submit = () => {};
  const [fromToggle, setFromToggle] = useState(false);
  const [move, setMove] = useState("100vh");
  const [moveButtonContainer, setMoveButtonContainer] = useState("unset");
  const [moveWrapper, setMoveWrapper] = useState(
    "translateY(calc(100vh - 297px))"
  );
  const handleFormToggle = () => {
    setFromToggle(!fromToggle);

    if (!fromToggle) {
      setMove("unset");
      setMoveWrapper("translateY(-287px)");
    } else {
      setMove("translateY(100vh)");
      setMoveButtonContainer("translateY(100px)");
      setMoveWrapper("translateY(calc(100vh - 297px))");
    }
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FpcmFqazE5IiwiYSI6ImNrc3hiMTkwcTBhdWQybnAyZnJjZmYybHkifQ.RaD2tnWTR8vjk4Q20zDTzQ";

    const mapBox = new mapboxgl.Map({
      container: "getting-started-form-map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [73.792318, 15.583988], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    console.log(mapBox);
    const Map = TestMap("getting-started-form-map");
    console.log(Map)
  }, []);

  return (
    <>
      <div className="GettingStarted container">
        <img src={starman} />
        <div style={{ transform: moveWrapper }} className="animation-wrapper">
          <div className="getting-started--button-container">
            <h2>Manage Your Farm With Us</h2>
            <p>
              Build a Responsive Supply Chain. Improve collaboration between
              destributors and sellers, and help save lives together.
            </p>
            <button onClick={handleFormToggle}>Getting Started</button>
          </div>
          <div
            className="getting-started-form-container"
            id="getting-started-form"
          >
            <div className="getting-started-form-container-heading">
              <h2>Account Details</h2>
              <img src={close} onClick={handleFormToggle} />
            </div>
            <div className="form-wrapper">
              <form onSubmit={submit} className="getting-started-form">
                <div className="gs-form-input">
                  <label>
                    Farm Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Anatoli Poultry Farm"
                    required
                  />
                </div>
                <div className="gs-form-input">
                  <label>
                    Owner Name <span>*</span>{" "}
                  </label>
                  <input type="text" placeholder="Anatoly Yakovenko" required />
                </div>
                <div className="gs-form-input">
                  <label>
                    Contact Number <span>*</span>
                  </label>
                  <input type="number" placeholder="9774835592" required />
                </div>
                <div
                  className="getting-started-form-map"
                  id="getting-started-form-map"
                ></div>
                <button>Create Account</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GettingStarted;
