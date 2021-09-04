import React, { useState, useEffect, useRef } from "react";
import { Map } from "mapbox-gl";

import "./GettingStarted.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Icons and Vectors.
import starman from "../../assets/images/vector-art/starman.svg";
import close from "../../assets/images/icons/close.svg";

import { TestMap } from "../mapbox";
import GettingStartedDesktop from "../GettingStartedDesktop/GettingStartedDesktop";

import { useHistory, useParams } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  CreateAccountAndInitialiseDistributor,
  CreateAccountAndInitialiseFarm,
  CreateAccountAndInitialiseOfficer,
  CreateAccountAndInitialiseSeller,
} from "../../instructions/index";
import { PublicKey } from "@solana/web3.js";

const GettingStartedMobile = () => {
  //@ts-ignore
  const { userType } = useParams<{ userType: string }>();
  const submit = () => {};
  const [fromToggle, setFromToggle] = useState(false);
  const [moveWrapper, setMoveWrapper] = useState(
    "translateY(calc(100vh - 297px))"
  );
  const [map, setMap] = useState<Map>();
  // sdasd
  const { connected, publicKey, sendTransaction } = useWallet();
  const history = useHistory();
  const { connection } = useConnection();
  const [geolocate, setGeolocate] = useState<any | undefined>();
  // const [userType, setUserType] = useState<string>("distributor");
  const [programId, setProgramId] = useState<PublicKey>();
  const name = useRef<any>();
  const companyName = useRef<any>();
  const contactNumber = useRef<any>();
  const officeId = useRef<any>();
  const [coordinates, setCoordinates] = useState<string | undefined>(undefined);

  const handleFormToggle = () => {
    setFromToggle(!fromToggle);

    if (!fromToggle) {
      setMoveWrapper("translateY(-287px)");
    } else {
      setMoveWrapper("translateY(calc(100vh - 297px))");
    }
  };

  useEffect(() => {
    console.log(publicKey, connected);

    setProgramId(new PublicKey("DZRQuRb6c8aT9L22JU7R4uLPADJPT7682ejhV7jukaDT"));

    const mapData = TestMap("getting-started-form-map");
    setMap(mapData.map);
    setGeolocate(mapData.geolocation);
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
            history.push("/farm-dashboard");
          })
          .catch(() => {
            console.log("Failed");
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
            history.push("/distributors-dashboard");
          })
          .catch(() => {
            console.log("Failed transaction");
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
            history.push("/sellers-dashboard");
          })
          .catch(() => {
            console.log("Failed transaction");
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
        );
      }
    } else {
      console.log("Termited since", connected, programId, publicKey);
    }
  };

  return (
    <>
      <div className="GettingStarted container">
        <img src={starman} />
        <div style={{ transform: moveWrapper }} className="animation-wrapper">
          <div className="getting-started--button-container">
            {userType === "farmer" ? (
              <h2>Manage Your Farm With Us</h2>
            ) : userType === "distributor" ? (
              <h2 style={{ fontSize: "5vw", fontWeight: 500 }}>
                Manage Your Distribution Center With Us
              </h2>
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
              <form
                onSubmit={handleFormSubmit}
                className="getting-started-form"
              >
                <div className="gs-form-input">
                  {userType === "farmer" ? (
                    <label>
                      Farm Name <span>*</span>
                    </label>
                  ) : userType === "distributor" ? (
                    <label>
                      Distribution Center Name <span>*</span>
                    </label>
                  ) : userType === "seller" ? (
                    <label>
                      Shop Name <span>*</span>
                    </label>
                  ) : userType === "officer" ? (
                    <label>
                      Office Id <span>*</span>
                    </label>
                  ) : (
                    ""
                  )}
                  {userType === "officer" ? (
                    <input
                      type="text"
                      placeholder="1030"
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
                <div className="gs-form-input">
                  {userType === "officer" ? (
                    <label>
                      Officer Name <span>*</span>{" "}
                    </label>
                  ) : (
                    <label>
                      Owner Name <span>*</span>{" "}
                    </label>
                  )}
                  <input
                    type="text"
                    placeholder="Anatoly Yakovenko"
                    ref={name}
                    required
                  />
                </div>
                <div className="gs-form-input">
                  <label>
                    Contact Number <span>*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="9774835592"
                    ref={contactNumber}
                    required
                  />
                </div>
                <div className="gs-form-input">
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
                    className="getting-started-form-map"
                    id="getting-started-form-map"
                  ></div>
                </div>
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
    if (window.innerWidth <= 500) {
      setComp("mobile");
      console.log("less");
    } else {
      setComp("desktop");
      console.log("more");
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 500) {
        setComp("mobile");
        console.log("less");
      } else {
        setComp("desktop");
        console.log("more");
      }
    });
    console.log("added event lstnere");
  }, []);

  if (comp == "desktop") {
    return <GettingStartedDesktop />;
  } else {
    return <GettingStartedMobile />;
  }
};

export default GettingStarted;
