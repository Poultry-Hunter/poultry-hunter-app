import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
// import { Inventory } from "../DistributorsDashboard/DistributorsDashboard";

// import { DDTable } from "../DistributorsDashboard/DistributorsDashboard";
import cart from "../../assets/images/icons/cart.svg";
import FilterIcon from "../../assets/images/icons/filter.svg";
import { Icon } from "@iconify/react";
import close from "../../assets/images/icons/close.svg";
import phLogoBrownBroder from "../../assets/images/logo/phLogoBrownBorder.svg";

import "./SellersDashboard.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { checkSellerAccount } from "../../utils/checkAccount";
import { PublicKey } from "@solana/web3.js";
import { SellerAccount } from "../../schema";
import { UpdateBatchSeller } from "../../instructions";
import { useHistory } from "react-router-dom";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import { WalletDisconnectButton } from "@solana/wallet-adapter-material-ui";
import { getChickens } from "../../common/utils";
import { toast } from "react-toastify";

const SellersDashboard = () => {
  const [qrToggle, setQrToggle] = useState<boolean>(false);
  const [qrAnimation, setQrAnimation] = useState<string>(
    "qr-dont-show 400ms ease-in-out"
  );
  const [batchDataAnimation, setBatchDataAnimation] =
    useState<string>("translateY(400px)");
  const [qrData, setQrData] = useState<any>();
  const [navigation, setNavigation] = useState<string>("dashboard");
  const [sellersData, setSellersData] = useState<SellerAccount | undefined>(
    undefined
  );
  const [currentBatchData, setCurrentBatchData] = useState<any>({
    batchId: undefined,
    batchSize: undefined,
    key: undefined,
  });
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const history = useHistory();
  const [batchData, setBatchData] = useState([]);

  const handleQRToggle = (close = "any") => {
    if (close == "close") {
      setQrAnimation("qr-dont-show 400ms ease-in-out");
      setQrToggle(false);
    } else {
      setQrToggle(!qrToggle);
      if (!qrToggle) {
        setQrAnimation("qr-show 400ms ease-in-out");
        setBatchDataAnimation("translateY(0px)");
      } else {
        setQrAnimation("qr-dont-show 400ms ease-in-out");
      }
    }
  };

  const updateBatchData = () => {
    if (publicKey) {
      UpdateBatchSeller(
        new PublicKey("DZRQuRb6c8aT9L22JU7R4uLPADJPT7682ejhV7jukaDT"),
        currentBatchData.key,
        new PublicKey(publicKey),
        connection,
        sendTransaction
      )
        .then(() => {
          console.log("successfully added to inventory");
          toast("Added batch to inventory!! 🚀");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleBatchDataToggle = () => {
    setBatchDataAnimation("translateY(400px)");
  };

  const handleScan = (data: any) => {
    if (data) {
      setQrData(data);

      setCurrentBatchData({
        batchId: JSON.parse(data).Batch_id,
        batchSize: JSON.parse(data).Batch_size,
        key: JSON.parse(data).Key,
      });

      setBatchDataAnimation("translateY(0px)");
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };

  useEffect(() => {
    if (connected && publicKey) {
      checkSellerAccount(
        new PublicKey("DZRQuRb6c8aT9L22JU7R4uLPADJPT7682ejhV7jukaDT"),
        new PublicKey(publicKey),
        connection
      )
        .then((data: any) => {
          if (!data) {
            history.push("getting-started/seller");
          }
          console.log(data.data);
          setSellersData(data.data);
          setBatchData(data.seller_batches);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(connected, publicKey);
    }
  }, [publicKey]);

  return connected ? (
    <div className="seller-dash">
      <header>
        <div className="s-header-name">
          {sellersData !== undefined ? (
            <h3>
              <span id="light">Hi, </span>
              {sellersData.owner_name} ProSeller
            </h3>
          ) : (
            <h3>
              <span id="light">Hi, </span>Loading
            </h3>
          )}
          <WalletDisconnectButton
            style={{
              right: "0px",
              width: "fit-content",
              height: "30px",
              borderRadius: "15px",
              fontSize: "0px",
              fontWeight: 500,
            }}
          />
          {/* <img src={cart} /> */}
        </div>
      </header>
      <main className="seller-dash-main">
        <Inventory batchData={batchData} navigation={navigation} />
      </main>

      <div
        className="dd-qr-code-scanner-comp"
        style={{ animation: qrAnimation, animationFillMode: "forwards" }}
      >
        <div className="dd-qr-code-text">
          <h3>Place the QR code inside the area </h3>
          <p>Scanning will start automatically </p>
        </div>
        <div className="dd-qr-code-reader">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      {/* Scan Results */}
      <div
        className="dd-scan-results"
        style={{ transform: batchDataAnimation }}
      >
        <img src={close} id="dd-close" onClick={handleBatchDataToggle} />
        <img src={phLogoBrownBroder} id="dd-logo" />
        <div className="dd-scan-results-data">
          <h1>
            Batch ID:
            {currentBatchData.batchId === undefined
              ? 0
              : currentBatchData.batchId}
          </h1>
          <p>
            {currentBatchData.batchSize === undefined
              ? 0
              : currentBatchData.batchSize}{" "}
            Chickens in the batch.
          </p>
        </div>
        <button>Add to Inventory</button>
      </div>
      <div className="distributors-dash-bottom-panel-wrapper">
        <div className="distributors-dash-bottom-panel">
          <div
            className="distributors-dash-panel-icon"
            id="dash-icon"
            onClick={() => {
              setNavigation("dashboard"), handleQRToggle("close");
            }}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2998 8.40005C6.2998 7.24025 7.24001 6.30005 8.3998 6.30005H33.5998C34.7596 6.30005 35.6998 7.24025 35.6998 8.40005V12.6C35.6998 13.7598 34.7596 14.7 33.5998 14.7H8.39981C7.24001 14.7 6.2998 13.7598 6.2998 12.6V8.40005Z"
                fill="#707070"
              />
              <path
                d="M6.2998 21C6.2998 19.8402 7.24001 18.9 8.3998 18.9H20.9998C22.1596 18.9 23.0998 19.8402 23.0998 21V33.6C23.0998 34.7598 22.1596 35.7 20.9998 35.7H8.3998C7.24001 35.7 6.2998 34.7598 6.2998 33.6V21Z"
                fill="#707070"
              />
              <path
                d="M29.3998 18.9C28.24 18.9 27.2998 19.8402 27.2998 21V33.6C27.2998 34.7598 28.24 35.7 29.3998 35.7H33.5998C34.7596 35.7 35.6998 34.7598 35.6998 33.6V21C35.6998 19.8402 34.7596 18.9 33.5998 18.9H29.3998Z"
                fill="#707070"
              />
            </svg>
            <p>Dashboard</p>
          </div>
          <div
            className="distributors-dash-panel-icon"
            id="qr-icon"
            onClick={() => handleQRToggle()}
          >
            <svg
              width="56"
              height="58"
              viewBox="0 0 56 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="28"
                cy="28.5091"
                rx="28"
                ry="28.5091"
                fill="#FF9900"
              />
              <path
                d="M18.1462 19H25.8655V26.5H18.1462V19ZM38.731 19V26.5H31.0117V19H38.731ZM31.0117 32.75H33.5848V30.25H31.0117V27.75H33.5848V30.25H36.1579V27.75H38.731V30.25H36.1579V32.75H38.731V36.5H36.1579V39H33.5848V36.5H29.7251V39H27.152V34H31.0117V32.75ZM33.5848 32.75V36.5H36.1579V32.75H33.5848ZM18.1462 39V31.5H25.8655V39H18.1462ZM20.7193 21.5V24H23.2924V21.5H20.7193ZM33.5848 21.5V24H36.1579V21.5H33.5848ZM20.7193 34V36.5H23.2924V34H20.7193ZM18.1462 27.75H20.7193V30.25H18.1462V27.75ZM24.5789 27.75H29.7251V32.75H27.152V30.25H24.5789V27.75ZM27.152 21.5H29.7251V26.5H27.152V21.5ZM15.5731 16.5V21.5H13V16.5C13 15.837 13.2711 15.2011 13.7536 14.7322C14.2362 14.2634 14.8907 14 15.5731 14H20.7193V16.5H15.5731ZM41.3041 14C41.9865 14 42.641 14.2634 43.1236 14.7322C43.6061 15.2011 43.8772 15.837 43.8772 16.5V21.5H41.3041V16.5H36.1579V14H41.3041ZM15.5731 36.5V41.5H20.7193V44H15.5731C14.8907 44 14.2362 43.7366 13.7536 43.2678C13.2711 42.7989 13 42.163 13 41.5V36.5H15.5731ZM41.3041 41.5V36.5H43.8772V41.5C43.8772 42.163 43.6061 42.7989 43.1236 43.2678C42.641 43.7366 41.9865 44 41.3041 44H36.1579V41.5H41.3041Z"
                fill="white"
              />
            </svg>
          </div>
          <div
            className="distributors-dash-panel-icon"
            id="inventory-icon"
            onClick={() => {
              setNavigation("inventory"), handleQRToggle("close");
            }}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7002 6.30005C13.5404 6.30005 12.6002 7.24025 12.6002 8.40005C12.6002 9.55985 13.5404 10.5 14.7002 10.5H27.3002C28.46 10.5 29.4002 9.55985 29.4002 8.40005C29.4002 7.24025 28.46 6.30005 27.3002 6.30005H14.7002Z"
                fill="#707070"
              />
              <path
                d="M8.4002 14.7C8.4002 13.5403 9.3404 12.6 10.5002 12.6H31.5002C32.66 12.6 33.6002 13.5403 33.6002 14.7C33.6002 15.8598 32.66 16.8 31.5002 16.8H10.5002C9.3404 16.8 8.4002 15.8598 8.4002 14.7Z"
                fill="#707070"
              />
              <path
                d="M4.2002 23.1C4.2002 20.7805 6.0806 18.9 8.4002 18.9H33.6002C35.9198 18.9 37.8002 20.7805 37.8002 23.1V31.5001C37.8002 33.8196 35.9198 35.7001 33.6002 35.7001H8.4002C6.0806 35.7001 4.2002 33.8196 4.2002 31.5001V23.1Z"
                fill="#707070"
              />
            </svg>
            <p>Inventory</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ConnectWallet />
  );
};

export const Inventory = ({ batchData, navigation }: any) => {
  const [totalChickens, setTotalChickens] = useState<any>(undefined);

  useEffect(() => {
    setTotalChickens(getChickens(batchData));
  }, [batchData]);

  return (
    <div className="dd-inventory-main-comp">
      <main>
        <div className="dd-inventory-summary">
          <h1>Inventory Summary</h1>
          <div className="dd-inventory-data">
            <div className="dd-inventory-data-item">
              {batchData ? (
                batchData.length !== 0 ? (
                  <h1>{batchData.length}</h1>
                ) : (
                  <h1>0</h1>
                )
              ) : (
                <h1>0</h1>
              )}
              <p>Batches</p>
            </div>
            <div className="dd-inventory-data-item">
              {totalChickens !== undefined ? (
                <h1>{totalChickens}</h1>
              ) : (
                <h1>0</h1>
              )}
              <p>Chickens</p>
            </div>
          </div>
        </div>
        {navigation === "dashboard" ? (
          <DDTable batchData={batchData} navigation={"Recent"} />
        ) : (
          <DDTable batchData={batchData} navigation={"Inventory"} />
        )}
      </main>
    </div>
  );
};

export const DDTable = ({ batchData, navigation }: any) => {
  // batchData = [{batch_id:10, batch_size: 100}]
  return (
    <div className="dd-main-table">
      <div className="dd_analytics_history">
        <div className="dd_analytics_history_head">
          <h3>{navigation}</h3>
          <img
            src={FilterIcon}
            alt=""
            style={{ width: "25px", fill: "#909090" }}
          />
        </div>
        {batchData !== undefined ? (
          batchData.length !== 0 ? (
            <table className="dd_recent_table">
              <tr className="recent_table_head" id="dd-recent_table_content">
                <th>Date</th>
                <th>Time</th>
                <th>Batch ID</th>
                <th>Batch size</th>
              </tr>
              {batchData.map((batch: any) => {
                return (
                  <tr
                    className="recent_table_content"
                    id="dd-recent_table_content"
                  >
                    <th>10/02/2021</th>
                    <th>11:10</th>
                    <th>{batch.batch_id}</th>
                    <th>{batch.batch_size}</th>
                  </tr>
                );
              })}
            </table>
          ) : (
            <p style={{ textAlign: "center" }}>No Batches</p>
          )
        ) : (
          <p style={{ textAlign: "center" }}>No Batches</p>
        )}
      </div>
    </div>
  );
};

export default SellersDashboard;
