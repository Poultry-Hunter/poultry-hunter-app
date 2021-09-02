import React, { useEffect, useState } from "react";
import { TestMap } from "../mapbox";
import "./OfficerDashboard.css";
import QrReader from "react-qr-reader";
import { ReactComponent as InventoryIcon } from "../../assets/images/icons/inventoryIcon.svg";
import { ReactComponent as QrCodeIcon } from "../../assets/images/icons/QrIcon.svg";
import { Icon } from "@iconify/react";
import { ReactComponent as AffectedRedIcon } from "../../assets/images/icons/AffectedRedIcon.svg";
export const OfficerDashboard = () => {
  const [navButton, setNavButton] = useState(true);
  const [showQrScannerPopup, setshowQrScannerPopup] = useState(false);
  const [QrData, setQrData] = useState<any>();
  const handleScan = (data: any) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  return (
    <>
      <div className="visit_on_mobile">
        <p>Visit on Mobile</p>
      </div>
      <div className="officer_dashboard_container">
        {showQrScannerPopup ? (
          <div className="officer_scanner_popup">
            <button
              className="close_batch_popup"
              onClick={() => setshowQrScannerPopup(false)}
            >
              <Icon icon="iconoir:cancel" />
            </button>{" "}
            <div className="officer_dashboard_qr_title">
              <h3>Place the QR code inside the area </h3>
              <h4>Scanning will start automatically </h4>
              <div className="officer_dashboard_qr_scanner">
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                />
              </div>
              {QrData != null ? (
                <div className="officer_dashboard_batch_data">
                  <h3>Batch ID: 200</h3>
                  <h4>30 batches in chicken</h4>
                  <div className="officer_batch_data_farm_dist">
                    <h3>Farm: 1</h3>
                    <h3>Distributor: 1</h3>
                  </div>
                  <button>Mark Infected</button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {navButton ? <Dashboard /> : <MarkedAffected />}
        <div className="officer_dashboard_bottom_navigation">
          <div className="officer_dashboard_bottom_nav_bar">
            <button onClick={() => setNavButton(true)}>
              <Icon
                icon="ic:round-space-dashboard"
                className={navButton ? "nav_active" : ""}
              />
            </button>
            <button
              className="farm_navigation_create_button officer_dash_qricon"
              onClick={() => setshowQrScannerPopup(true)}
            >
              <QrCodeIcon />
            </button>
            <button onClick={() => setNavButton(false)}>
              <InventoryIcon className={!navButton ? "nav_active" : ""} />
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
};
function Dashboard() {
  useEffect(() => {
    const map = TestMap("officer_map");
  }, []);
  return (
    <>
      {" "}
      <div id="officer_map" className="officer_map"></div>
      <div className="officer_dashboard_title">
        <h3>
          Hi,<span>SanketPro</span>
        </h3>
      </div>
    </>
  );
}

function MarkedAffected() {
  return (
    <div className="officer_dashboard_marked_chain">
      <div className="office_dashboard_marked_chain_title">
        <h3>Marked Affected Chain</h3>
      </div>
      <div className="officer_marked_chain_list">
        <div className="marked_chain_card">
          <div className="marked_chain_card_head">
            <AffectedRedIcon />
            <h3>Batch ID: 3402</h3>
          </div>
          <div className="marked_chain_data">
            <div className="marked_chain_info">
              <svg
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 1C1.99122 21.9851 8.22362 28.2877 30.5 27.5"
                  stroke="#FF9900"
                  stroke-width="3"
                />
              </svg>

              <h3>Sanket ProSeller - Seller</h3>
              <h4>Contact Number : +91 73238 49388</h4>
            </div>
            <Icon
              icon="carbon:location-filled"
              className="batch_location_icon"
            />
          </div>
          <div className="marked_chain_data">
            <div className="marked_chain_info">
              <svg
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 1C1.99122 21.9851 8.22362 28.2877 30.5 27.5"
                  stroke="#FF9900"
                  stroke-width="3"
                />
              </svg>

              <h3>Sanket ProSeller - Distributor</h3>
              <h4>Contact Number : +91 73238 49388</h4>
            </div>
            <Icon
              icon="carbon:location-filled"
              className="batch_location_icon"
            />
          </div>{" "}
          <div className="marked_chain_data">
            <div className="marked_chain_info">
              <svg
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 1C1.99122 21.9851 8.22362 28.2877 30.5 27.5"
                  stroke="#FF9900"
                  stroke-width="3"
                />
              </svg>

              <h3>Sanket ProSeller - Farmer</h3>
              <h4>Contact Number : +91 73238 49388</h4>
            </div>
            <Icon
              icon="carbon:location-filled"
              className="batch_location_icon"
            />
          </div>
          <button>Mark As UnAffected</button>
        </div>
      </div>
    </div>
  );
}
