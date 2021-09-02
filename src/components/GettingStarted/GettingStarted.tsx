import React, { useState, useEffect } from "react";
import { Map } from "mapbox-gl";

import "./GettingStarted.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Icons and Vectors.
import starman from "../../assets/images/vector-art/starman.svg";
import close from "../../assets/images/icons/close.svg";

import { TestMap } from "../mapbox";
import GettingStartedDesktop from "../GettingStartedDesktop/GettingStartedDesktop";

const GettingStartedMobile = () => {
  const submit = () => {};
  const [fromToggle, setFromToggle] = useState(false);
  const [moveWrapper, setMoveWrapper] = useState(
    "translateY(calc(100vh - 297px))"
  );
  const [map, setMap] = useState<Map>();

  const handleFormToggle = () => {
    setFromToggle(!fromToggle);

    if (!fromToggle) {
      setMoveWrapper("translateY(-287px)");
    } else {
      setMoveWrapper("translateY(calc(100vh - 297px))");
    }
  };

  useEffect(() => {
    setMap(TestMap("getting-started-form-map"));
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
            <button
              onClick={handleFormToggle}
              className="getting-started-desktop-form-button"
            >
              Getting Started
            </button>
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
                <button className="getting-started-desktop-form-button">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const GettingStarted = () => {
  const [comp, setComp] = useState<string>("desktop");

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 500) {
        setComp("mobile");
        console.log("less")
      } else {
        setComp("desktop");
        console.log("more")
      }
    });
    console.log("added event lstnere")
  }, []);

  if (comp == "desktop") {
    return <GettingStartedDesktop />;
  } else {
    return <GettingStartedMobile />;
  }
};

export default GettingStarted;
