import React from "react";
import "./farmdashboard.css";
import logo from "../../assets/images/logo/logo.svg";
import a4Paper from "../../assets/images/icons/a4-paper.svg";
import qricon from "../../assets/images/icons/qrcode.svg";
import qrnopreview from "../../assets/images/vector-art/qrnopreview.svg";
import GeneratedIcon from "../../assets/images/icons/generated-icon.svg";
import FilterIcon from "../../assets/images/icons/filter.svg";
import SalesIcon from "../../assets/images/icons/salesIcon.svg";
import bargraph from "../../assets/images/vector-art/graph.svg";
import { Icon } from "@iconify/react";
export const FarmDashboard = () => {
  return (
    <div className="farm_dashboard_container container">
      <div className="farm_dashboard_sidebar">
        <img src={logo} alt="" />
        <Icon
          icon="ic:round-space-dashboard"
          style={{ marginTop: "60px", width: "40px", height: "40px" }}
        />
      </div>
      <div className="farm_dashboard">
        <div className="farm_dashboard_head">
          <div className="farm_dashboard_title">
            <h3>Dashboard</h3>
            <h4>
              hi, <span>Sanket ProFarm</span>
            </h4>
          </div>

          <button className="farm_dashboard_wallet_button">Connected</button>
        </div>
        <div className="farm_dashbord_main">
          <div className="farm_dashboard_anlaytics">
            <div className="farm_dashboard_analytics_info">
              <div className="farm_dashboard_analytics_bar">
                <img src={bargraph} alt="" style={{ height: "60%" }} />
                <div className="analytics_bar_sale">
                  <h3>
                    137<h5>Chickens</h5>
                  </h3>
                  <h4>sold this month</h4>
                </div>
              </div>
              <div className="farm_dashboard_analytics_sales">
                <div className="analytics_filter">
                  <button className="weekly-button">Weely</button>
                  <button className="monthly-button">Monthly</button>
                </div>
                <div className="analytics_total_batches">
                  <div className="total_batches_info">
                    <h3>1029</h3>
                    <h4>Total batches generated</h4>
                  </div>
                  <img
                    src={GeneratedIcon}
                    alt=""
                    style={{ width: "50px", fill: "#909090" }}
                  />
                </div>
                <div className="analytics_total_sales">
                  <div className="total_sales_info">
                    <h3>1002</h3>
                    <h4>Total batches Sold</h4>
                  </div>
                  <img
                    src={SalesIcon}
                    alt=""
                    style={{ width: "50px", fill: "#909090" }}
                  />
                </div>
              </div>
            </div>
            <div className="farm_dashboard_analytics_history">
              <div className="farm_dashboard_analytics_history_head">
                <h3>Recent</h3>
                <img
                  src={FilterIcon}
                  alt=""
                  style={{ width: "25px", fill: "#909090" }}
                />
              </div>
              <table className="farm_dashboard_recent_table">
                <tr className="recent_table_head">
                  <th>Date</th>
                  <th>Time</th>
                  <th>Batch ID</th>
                  <th>Batch size</th>
                  <th>Preview</th>
                  <th>Refund</th>
                </tr>
                {[1, 2, 3, 4, 5].map(() => {
                  return (
                    <tr className="recent_table_content">
                      <th>10/02/2021</th>
                      <th>11:10</th>
                      <th>232</th>
                      <th>20</th>
                      <th>
                        <img src={qricon} alt="" style={{ width: "20px" }} />
                      </th>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="farm_dashboard_create_batch">
            <div className="create_batch_title">
              <h3>Create New Batch</h3>
            </div>
            <div className="create_batch">
              <div className="create_batch_input">
                <button>-</button>
                <input type="text" placeholder="No. of chickens" />
                <button>+</button>
              </div>
              <button className="create_batch_button">Create</button>
            </div>

            <div className="generated_batch_qrcode">
              <h3>QR Code Preview</h3>
              <img src={qrnopreview} alt="" />
            </div>
            <div className="qr_print_section">
              <h3>Print</h3>
              <div className="qr_print_buttons">
                <button>
                  {" "}
                  <img
                    src={qricon}
                    alt=""
                    style={{ width: "15px", marginRight: "5px" }}
                  />
                  Single QR
                </button>
                <button>
                  <img
                    src={a4Paper}
                    alt=""
                    style={{ width: "10px", marginRight: "5px" }}
                  />{" "}
                  A4 page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
