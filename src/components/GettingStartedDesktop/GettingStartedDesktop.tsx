import React, { useState, useEffect } from "react";
import { Map } from "mapbox-gl";
import { TestMap } from "../mapbox";

import starman from "../../assets/images/vector-art/starman.svg";
import close from "../../assets/images/icons/close.svg";

import "./GettingStartedDesktop.css";

export const GettingStartedDesktop = () => {
  const [map, setMap] = useState<Map>();
  const [formToggle, setFormToggle] = useState<boolean>(false);
  const [formAnimation, setFormAnimation] = useState<string>(
    "dont-show 400ms ease-in-out"
  );

  const handleFormToggle = () => {
    setFormToggle(!formToggle);
    if (!formToggle) {
      setFormAnimation("show 400ms ease-in-out");
    } else {
      setFormAnimation("dont-show 400ms ease-in-out");
    }
  };

  useEffect(() => {
    setMap(TestMap("getting-started-form-map--desktop"));
  }, []);

  return (
    <div className="getting-started-desktop-main">
      <div className="getting-started-desktop-main-left">
        {" "}
        <img src={starman} />{" "}
      </div>
      <div className="getting-started-desktop-main-right">
        <div className="getting-started--button-container--desktop">
          <h2>Manage Your Farm With Us</h2>
          <p>
            Build a Responsive Supply Chain. Improve collaboration between
            destributors and sellers, and help save lives together.
          </p>
          <button onClick={handleFormToggle}>Getting Started</button>
        </div>
        <div
          className="getting-started-form-container--desktop"
          id="getting-started-form--desktop"
          style={{ animation: formAnimation }}
        >
          <div className="getting-started-form-container-heading--desktop">
            <h2>Account Details</h2>
            {/* <img src={close} onClick={handleFormToggle} /> */}
            <img src={close} onClick={handleFormToggle} />
          </div>
          {/* <form onSubmit={submit} className="getting-started-form"> */}
          <form className="getting-started-form--desktop">
            <div className="gs-form-input--desktop">
              <label>
                Farm Name <span>*</span>
              </label>
              <input type="text" placeholder="Anatoli Poultry Farm" required />
            </div>
            <div className="gs-form-input--desktop">
              <label>
                Owner Name <span>*</span>{" "}
              </label>
              <input type="text" placeholder="Anatoly Yakovenko" required />
            </div>
            <div className="gs-form-input--desktop">
              <label>
                Contact Number <span>*</span>
              </label>
              <input type="number" placeholder="9774835592" required />
            </div>
            <div
              className="getting-started-form-map--desktop"
              id="getting-started-form-map--desktop"
            ></div>
            <button className="getting-started-desktop-form-button--desktop">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedDesktop;
