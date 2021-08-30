import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Map } from "mapbox-gl";
import { TestMap } from "../mapbox";

import "./Home.css";

// Icons and logo
import downArrow from "../../assets/images/icons/downArrow.svg";
import phLogoBrownBorder from "../../assets/images/logo/phLogoBrownBorder.svg";
import farmer from "../../assets/images/icons/farmer.svg";
import distributor from "../../assets/images/icons/distributor.svg";
import seller from "../../assets/images/icons/seller.svg";
import reportedSeller from "../../assets/images/vector-art/reportedSeller.svg";
import directContact from "../../assets/images/vector-art/directContact.svg";
import indirectContact from "../../assets/images/vector-art/indirectContact.svg";

const Home = () => {
  const [map, setMap] = useState<Map>();
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [dropDownScaleValue, setDropDownScaleValue] = useState("scaleY(0)");

  const handleDropDownToggle = () => {
    setDropDownToggle(!dropDownToggle);

    if (!dropDownToggle) {
      setDropDownScaleValue("scaleY(1)");
      console.log("showing");
    } else {
      setDropDownScaleValue("scaleY(0)");
      console.log("hiding");
    }
  };

  useEffect(() => {
    setMap(TestMap("home-page-map"));
  }, []);

  return (
    <div className="home-page">
      <div id="home-page-map"></div>
      <div className="home-navbar-wrapper">
        <div className="home-navbar">
          <div className="home-navbar-logo">
            <img src={phLogoBrownBorder} />
            <h2>
              Poultry <span id="orange">Hunter</span>
            </h2>
          </div>
          <div className="home-navbar-navigations">
            <Link to="/home">Home</Link>
            <Link to="/marketplace">MarketPlace</Link>
            <Link to="/enroll">Enroll</Link>
          </div>
          <div
            className="hone-navbar-dash-dropdown-wrapper"
            onClick={handleDropDownToggle}
          >
            <div className="home-navbar-dash-dropdown">
              <button>Dashboard</button>
              <img src={downArrow} />
            </div>
            <div
              className="navbar-dropdown-navigation"
              id="navbar-dropdown-navigation"
              style={{ transform: dropDownScaleValue }}
            >
              <div className="navbar-dropdown-navigation-button">
                <Link to="/farmer-dashboard">Farmer</Link>
                <img src={farmer} />
              </div>
              <div className="navbar-dropdown-navigation-button">
                <Link to="/distributor-dashboard">Distributor</Link>
                <img src={distributor} />
              </div>
              <div className="navbar-dropdown-navigation-button">
                <Link to="/seller-dashboard">Seller</Link>
                <img src={seller} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-page-bottom-tracker">
        <div className="home-page-bottom-tracker--card">
          <h3>Affected Farmers</h3>
          <div className="bottom-tracker--card-count">
            <h1>5</h1>
            <img src={farmer} />
          </div>
        </div>
        <div className="home-page-bottom-tracker--card">
          <h3>Affected Distributors</h3>
          <div className="bottom-tracker--card-count">
            <h1>5</h1>
            <img src={distributor} />
          </div>
        </div>
        <div className="home-page-bottom-tracker--card">
          <h3>Affected Sellers</h3>
          <div className="bottom-tracker--card-count">
            <h1>5</h1>
            <img src={seller} />
          </div>
        </div>
      </div>
      <div className="home-page-map-navigations">
        <div className="home-page-map-navigations--card">
          <h3>Index</h3>
          <div className="map-index-list">
            <img src={reportedSeller} />
            <p>Reported Sellers</p>
          </div>
          <div className="map-index-list">
            <img src={directContact} />
            <p>Direct Contact</p>
          </div>
          <div className="map-index-list">
            <img src={indirectContact} />
            <p>Indirect Contact</p>
          </div>
        </div>
        <div className="home-page-map-navigations--card">
          <h3>Filter</h3>
          <div className="map-filter-buttons">
            <label className="map-filter-checkbox">
              <input type="checkbox" />
              Farm
            </label>
            <label className="map-filter-checkbox">
              <input type="checkbox" />
              Distributor
            </label>
            <label className="map-filter-checkbox">
              <input type="checkbox" />
              Seller
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
