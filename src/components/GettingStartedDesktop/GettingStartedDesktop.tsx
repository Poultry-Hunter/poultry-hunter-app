import React, { useState, useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { TestMap } from "../mapbox";

import starman from "../../assets/images/vector-art/starman.svg";
import close from "../../assets/images/icons/close.svg";

import "./GettingStartedDesktop.css";

import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

import { useHistory, useParams } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  CreateAccountAndInitialiseDistributor,
  CreateAccountAndInitialiseFarm,
  CreateAccountAndInitialiseOfficer,
  CreateAccountAndInitialiseSeller,
} from "../../instructions/index";
import { PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";
import { programId } from "../../utils/utils";

export const GettingStartedDesktop = () => {
  const { userType } = useParams<{ userType: string }>();
  const { connected, publicKey, sendTransaction } = useWallet();
  const history = useHistory();
  const { connection } = useConnection();
  const [map, setMap] = useState<Map>();
  const [geolocate, setGeolocate] = useState<any | undefined>();
  const [formToggle, setFormToggle] = useState<boolean>(false);
  const [formAnimation, setFormAnimation] = useState<string>("unset");
  const name = useRef<any>();
  const companyName = useRef<any>();
  const contactNumber = useRef<any>();
  const officeId = useRef<any>();
  const [coordinates, setCoordinates] = useState<string | undefined>(undefined);
  const [disable, setDisable] = useState(false);

  const handleFormToggle = () => {
    setFormToggle(!formToggle);
    if (!formToggle) {
      setFormAnimation("show 400ms ease-in-out");
    } else {
      setFormAnimation("dont-show 400ms ease-in-out");
    }
  };

  useEffect(() => {
    console.log(publicKey, connected);
    const mapData = TestMap("getting-started-form-map--desktop");
    setMap(mapData.map);
    setGeolocate(mapData.geolocation);

    // Initialize the GeolocateControl.
  }, []);

  useEffect(() => {
    if (geolocate) {
      geolocate.on("geolocate", (data: any) => {
        console.log("A geolocate event has occurred.");
        setCoordinates(`${data.coords.latitude} ${data.coords.longitude}`);
      });
    }
  }, [geolocate]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setDisable(true);

    console.log(process.env.PROGRAMID);
    if (connected && programId && publicKey && coordinates) {
      if (userType === "farmer") {
        await CreateAccountAndInitialiseFarm(
          programId,
          publicKey,
          {
            farm_name: companyName.current.value,
            owner_name: name.current.value,
            contact_number: contactNumber.current.value,
            farm_address: coordinates,
            refund_account: publicKey.toBuffer(),
            infected: 0,
          },
          connection,
          sendTransaction
        )
          .then(() => {
            console.log("transaction done!!");
            setDisable(false);
            toast("Created new account!! 🚀️");
            history.push("/farm-dashboard");
          })
          .catch(() => {
            console.log("Failed");
            toast.error("Transaction failed, try again!");
            history.push("/error");
          });
      } else if (userType === "distributor") {
        await CreateAccountAndInitialiseDistributor(
          programId,
          publicKey,
          {
            distribution_center: companyName.current.value,
            distributor_name: name.current.value,
            contact_number: contactNumber.current.value,
            center_address: coordinates,
            infected: 0,
          },
          connection,
          sendTransaction
        )
          .then(() => {
            console.log("transaction done");
            setDisable(false);
            toast("Created new account!! 🚀️");
            history.push("/distributors-dashboard");
          })
          .catch(() => {
            console.log("Failed transaction");
            toast.error("Transaction failed, try again!");
            history.push("/error");
          });
      } else if (userType === "seller") {
        await CreateAccountAndInitialiseSeller(
          programId,
          publicKey,
          {
            shop_name: companyName.current.value,
            owner_name: name.current.value,
            shop_address: coordinates,
            contact_number: contactNumber.current.value,
            infected: 0,
          },
          connection,
          sendTransaction
        )
          .then(() => {
            console.log("transaction done");
            setDisable(false);
            toast("Created new account!! 🚀️");
            history.push("/sellers-dashboard");
          })
          .catch(() => {
            console.log("Failed transaction");
            toast.error("Transaction failed, try again!");
            history.push("/error");
          });
      } else if (userType === "officer") {
        await CreateAccountAndInitialiseOfficer(
          programId,
          publicKey,
          {
            officer_name: name.current.value,
            office_id: officeId.current.value,
            office_address: coordinates,
            officer_contact: contactNumber.current.value,
          },
          connection,
          sendTransaction
        )
          .then(() => {
            console.log("transaction done");
            setDisable(false);
            toast("Created new account!! 🚀️");
            history.push("/officer-dashboard");
          })
          .catch(() => {
            console.log("Failed transaction");
            toast.error("Transaction failed, try again!");
            history.push("/error");
          });
      }
    } else {
      console.log("Termited since", connected, programId, publicKey);
    }
  };

  return (
    <div className="getting-started-desktop-main">
      <div className="getting-started-desktop-main-left">
        {" "}
        <img src={starman} />{" "}
      </div>
      <div className="getting-started-desktop-main-right">
        <div className="getting-started--button-container--desktop">
          {userType === "farmer" ? (
            <h2>Manage Your Farm With Us</h2>
          ) : userType === "distributor" ? (
            <h2>Manage Your Distribution Center With Us</h2>
          ) : userType === "seller" ? (
            <h2>Manage Your Shop With Us</h2>
          ) : userType === "officer" ? (
            <h2>Help us prevent bird flue</h2>
          ) : (
            ""
          )}
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
          <form
            className="getting-started-form--desktop"
            onSubmit={handleFormSubmit}
          >
            <div className="gs-form-input--desktop">
              {userType === "farmer" ? (
                <label>
                  Farm Name <span id="red-star">*</span>
                </label>
              ) : userType === "distributor" ? (
                <label>
                  Distribution Center Name <span id="red-star">*</span>
                </label>
              ) : userType === "seller" ? (
                <label>
                  Shop Name <span id="red-star">*</span>
                </label>
              ) : userType === "officer" ? (
                <label>
                  Office Id <span id="red-star">*</span>
                </label>
              ) : (
                ""
              )}

              {userType === "officer" ? (
                <input
                  type="text"
                  placeholder="Anatoli Poultry Farm"
                  ref={officeId}
                  required
                />
              ) : (
                <input
                  type="text"
                  placeholder="Anatoli Poultry Farm"
                  ref={companyName}
                  required
                />
              )}
            </div>
            <div className="gs-form-input--desktop">
              {userType === "officer" ? (
                <label>
                  Officer Name <span id="red-star">*</span>{" "}
                </label>
              ) : (
                <label>
                  Owner Name <span id="red-star">*</span>{" "}
                </label>
              )}
              <input
                type="text"
                placeholder="Anatoly Yakovenko"
                ref={name}
                required
              />
            </div>
            <div className="gs-form-input--desktop">
              <label>
                Contact Number <span id="red-star">*</span>
              </label>
              <input
                type="number"
                placeholder="9774835592"
                ref={contactNumber}
                required
              />
            </div>
            <div className="gs-form-input--desktop">
              {userType === "farmer" ? (
                <label>
                  Farm Location <span id="red-star">*</span>
                </label>
              ) : userType === "distributor" ? (
                <label>
                  Distribution Center Location <span id="red-star">*</span>
                </label>
              ) : userType === "seller" ? (
                <label>
                  Shop Location <span id="red-star">*</span>
                </label>
              ) : userType === "officer" ? (
                <label>
                  Office Location <span id="red-star">*</span>
                </label>
              ) : (
                ""
              )}

              <div
                className="getting-started-form-map--desktop"
                id="getting-started-form-map--desktop"
              ></div>
            </div>
            <button
              className="getting-started-desktop-form-button--desktop"
              type="submit"
              disabled={disable}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedDesktop;
