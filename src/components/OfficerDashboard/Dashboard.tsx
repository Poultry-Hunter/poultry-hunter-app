import React, { useEffect } from "react";
import { TestMap } from "../mapbox";
import "./OfficerDashboard.css";

import { ReactComponent as InventoryIcon } from "../../assets/images/icons/inventoryIcon.svg";
import { ReactComponent as QrCodeIcon } from "../../assets/images/icons/QrIcon.svg";
import { Icon } from "@iconify/react";
export const OfficerDashboard = () => {
  useEffect(() => {
    const map = TestMap("officer_map");
  }, []);
  return (
    <>
      <div className="visit_on_mobile">
        <p>Visit on Mobile</p>
      </div>
      <div className="officer_dashboard_container">
        <div id="officer_map" className="officer_map"></div>
        <div className="officer_dashboard_title">
          <h3>
            Hi,<span>SanketPro Officer</span>
          </h3>
        </div>
        <div className="officer_dashboard_bottom_navigation">
          <div className="officer_dashboard_bottom_nav_bar">
            <button>
              <Icon icon="ic:round-space-dashboard" />
            </button>
            <button className="farm_navigation_create_button officer_dash_qricon">
              <QrCodeIcon/>
            </button>
            <button>
              <InventoryIcon />
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
};
