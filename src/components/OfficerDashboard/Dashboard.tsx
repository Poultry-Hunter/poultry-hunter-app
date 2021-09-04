import React, { useEffect, useState } from "react";
import { TestMap } from "../mapbox";
import "./OfficerDashboard.css";
import QrReader from "react-qr-reader";
import { ReactComponent as InventoryIcon } from "../../assets/images/icons/inventoryIcon.svg";
import { ReactComponent as QrCodeIcon } from "../../assets/images/icons/QrIcon.svg";
import { Icon } from "@iconify/react";
import { ReactComponent as AffectedRedIcon } from "../../assets/images/icons/AffectedRedIcon.svg";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import { checkOfficerAccount } from "../../utils/checkAccount";
import { PublicKey } from "@solana/web3.js";
import GettingStarted from "../GettingStarted/GettingStarted";
import {
  CreateAccountAndInitialiseDistributor,
  CreateAccountAndInitialiseOfficer,
  SetAffectedChain,
} from "../../instructions";
import { HealthOfficerAccount } from "../../schema";
import { useHistory } from "react-router";
import { GetBatchData } from "../../utils/filters";
type officerDataType = {
  officer_data: HealthOfficerAccount;
  officer_account_pubkey: string;
};
export const OfficerDashboard = () => {
  const [navButton, setNavButton] = useState(true);
  const [showQrScannerPopup, setshowQrScannerPopup] = useState(false);
  const [QrData, setQrData] = useState<any>();
  const [OfficerPubkey, setOfficerPubkey] = useState<any>(false);
  const [OfficerAccountData, setOfficerAccountData] =
    useState<officerDataType>();
  const [markedAffectedBatches, setmarkedAffectedBatches] = useState([]);
  const [uiLoading, setuiLoading] = useState(false);
  const { connection } = useConnection();
  const { publicKey, connected, sendTransaction } = useWallet();
  const history = useHistory();
  useEffect(() => {
    // if (publicKey && connected) {
    //   CreateAccountAndInitialiseOfficer(
    //     new PublicKey("H2bq5hQFMpAPM7qD2gLMnLx6FN278MkAHKNHx1hcbaMB"),
    //     publicKey,
    //     {
    //       office_id: "333",
    //       office_address: "mapusa",
    //       officer_name: "india",
    //       officer_contact: "323232",
    //     },
    //     connection,
    //     sendTransaction
    //   ).then(() => console.log("dataSent"));
    // }
    if (publicKey && connected) {
      checkOfficerAccount(
        new PublicKey("H2bq5hQFMpAPM7qD2gLMnLx6FN278MkAHKNHx1hcbaMB"),
        new PublicKey("5tcdaxYsPy8XWAUy3HGbxFit2YWcLirkkyJy4KF1Gpwo"),
        connection
      )
        .then((officer_data) => {
          console.log(officer_data);
          if (!officer_data) {
            history.push("getting-started");
          } else {
            console.log(officer_data);
            setOfficerAccountData({
              officer_data: officer_data.officer_data,
              officer_account_pubkey: officer_data.officer_account_pubkey,
            });
            //@ts-ignore
            setmarkedAffectedBatches(officer_data.marked_batches);
            setuiLoading(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [connected, publicKey]);

  const handleScan = (data: any) => {
    if (data) {
      setQrData(JSON.parse(data));
    }
  };

  const handleError = (err: Error) => {
    console.error(err);
  };
  function markChain() {
    if (QrData && OfficerAccountData) {
      console.log(QrData);
      GetBatchData(
        new PublicKey("H2bq5hQFMpAPM7qD2gLMnLx6FN278MkAHKNHx1hcbaMB"),
        new PublicKey(QrData.key),
        connection
      ).then((data) => {
        SetAffectedChain(
          new PublicKey("H2bq5hQFMpAPM7qD2gLMnLx6FN278MkAHKNHx1hcbaMB"),
          0,
          new PublicKey(QrData.key),
          new PublicKey(data.farm_pubkey),
          new PublicKey(data.distributor_pubkey),
          new PublicKey(data.seller_pubkey),
          new PublicKey(OfficerAccountData.officer_account_pubkey),
          connection,
          sendTransaction
        ).catch((err) => console.log(err));
      });
    }
  }

  return connected && uiLoading ? (
    <>
      <div className="visit_on_mobile">
        <p>Visit on Mobile</p>
      </div>
      <div className="officer_dashboard_container">
        {showQrScannerPopup ? (
          <div className="officer_scanner_popup">
            <button
              className="close_batch_popup"
              onClick={() => {
                setshowQrScannerPopup(false);
                setQrData(null);
              }}
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
                  <h3>Batch ID: {QrData.batch_id}</h3>
                  <h4>{QrData.batch_size} batches in chicken</h4>
                  <div className="officer_batch_data_farm_dist">
                    <h3>Farm: 1</h3>
                    <h3>Distributor: 1</h3>
                  </div>
                  <button onClick={() => markChain()}>Mark Infected</button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {navButton ? (
          <Dashboard OfficerAccountData={OfficerAccountData} />
        ) : (
          <MarkedAffected
            markedAffectedBatches={markedAffectedBatches}
            officer_pubkey={OfficerAccountData?.officer_account_pubkey}
          />
        )}
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
  ) : (
    <ConnectWallet />
  );
};
function Dashboard({ OfficerAccountData }: any) {
  useEffect(() => {
    const map = TestMap("officer_map");
  }, []);
  return (
    <>
      {" "}
      <div id="officer_map" className="officer_map"></div>
      <div className="officer_dashboard_title">
        <h3>
          Hi,
          <span>
            {OfficerAccountData
              ? OfficerAccountData.officer_data.officer_name
              : "loading"}
          </span>
        </h3>
      </div>
    </>
  );
}

function MarkedAffected({ markedAffectedBatches, officer_pubkey }: any) {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  function unmarkChain(chain: any) {
    SetAffectedChain(
      new PublicKey("H2bq5hQFMpAPM7qD2gLMnLx6FN278MkAHKNHx1hcbaMB"),
      1,
      new PublicKey(chain.batch_pubkey),
      new PublicKey(chain.farm_pubkey),
      new PublicKey(chain.distributor_pubkey),
      new PublicKey(chain.seller_pubkey),
      new PublicKey(officer_pubkey),
      connection,
      sendTransaction
    ).catch((err) => console.log(err));
  }
  return (
    <div className="officer_dashboard_marked_chain">
      <div className="office_dashboard_marked_chain_title">
        <h3>Marked Affected Chain</h3>
      </div>
      <div className="officer_marked_chain_list">
        {markedAffectedBatches.length != 0
          ? markedAffectedBatches.map((chain: any) => {
              return (
                <div className="marked_chain_card">
                  <div className="marked_chain_card_head">
                    <AffectedRedIcon />
                    <h3>Batch ID: {chain.batch_id}</h3>
                  </div>
                  {chain.seller_data ? (
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

                        <h3>
                          <span>{chain.seller_data.shop_name}</span> - Seller
                        </h3>
                        <h4>
                          Contact Number : {chain.seller_data.contact_number}
                        </h4>
                      </div>
                      <Icon
                        icon="carbon:location-filled"
                        className="batch_location_icon"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {chain.distributor_data ? (
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

                        <h3>
                          <span>
                            {chain.distributor_data.distribution_center}
                          </span>{" "}
                          - Distributor
                        </h3>
                        <h4>
                          Contact Number :{" "}
                          {chain.distributor_data.contact_number}
                        </h4>
                      </div>
                      <Icon
                        icon="carbon:location-filled"
                        className="batch_location_icon"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {chain.farm_data ? (
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

                        <h3>
                          <span>{chain.farm_data.farm_name}</span> - Farmer
                        </h3>
                        <h4>
                          Contact Number : {chain.farm_data.contact_number}
                        </h4>
                      </div>
                      <Icon
                        icon="carbon:location-filled"
                        className="batch_location_icon"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <button>Mark As UnAffected</button>
                </div>
              );
            })
          : "No batches"}
      </div>
    </div>
  );
}
