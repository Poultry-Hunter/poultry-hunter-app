import React, { useState, useEffect } from "react";
// import mapboxgl from 'mapbox-gl';
const mapboxgl = require("mapbox-gl");

import "./GettingStarted.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Icons and Vectors.
import starman from "../../assets/images/vector-art/starman.svg";
import close from "../../assets/images/icons/close.svg";

const GettingStarted = () => {
  const submit = () => {};
  const [fromToggle, setFromToggle] = useState(false);
  const [move, setMove] = useState("100vh");

  const handleFormToggle = (event: any) => {
    event.preventDefault();
    const form = document.getElementById("getting-started-form-container");
    setFromToggle(!fromToggle);

    if (!fromToggle) {
      setMove("unset");
    } else {
      setMove("translateY(100vh)");
    }
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FpcmFqazE5IiwiYSI6ImNrc3hiMTkwcTBhdWQybnAyZnJjZmYybHkifQ.RaD2tnWTR8vjk4Q20zDTzQ";

    const map = new mapboxgl.Map({
      container: "getting-started-form-map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [15.51004, 73.966989], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    console.log(map);
  }, []);

  return (
    <>
      {/* <div
        className="getting-started-form-map"
        id="getting-started-form-map"
      ></div> */}
      <div className="GettingStarted container">
        <img src={starman} />
        <div className="getting-started--button-container">
          <h2>Manage Your Farm With Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada
            ut enim sollicitudin in elit quisque sit sed quisque.
          </p>
          <button onClick={handleFormToggle}>Getting Started</button>
        </div>
        <div
          className="getting-started-form-container"
          id="getting-started-form"
          style={{ transform: move }}
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
    </>
  );
};

export default GettingStarted;
