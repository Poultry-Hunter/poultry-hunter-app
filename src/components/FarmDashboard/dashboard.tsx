import React, { useRef, useState, useEffect } from "react";
import "./farmdashboard.css";
import logo from "../../assets/images/logo/logo.svg";
import a4Paper from "../../assets/images/icons/a4-paper.svg";
import qricon from "../../assets/images/icons/qrcode.svg";
import qrnopreview from "../../assets/images/vector-art/qrnopreview.svg";
import GeneratedIcon from "../../assets/images/icons/generated-icon.svg";
import FilterIcon from "../../assets/images/icons/filter.svg";
import SalesIcon from "../../assets/images/icons/salesIcon.svg";
import { ReactComponent as InventoryIcon } from "../../assets/images/icons/inventoryIcon.svg";
import { ReactComponent as MarketPlaceIcon } from "../../assets/images/icons/marketplace.svg";
import { ReactComponent as BatchesIcon } from "../../assets/images/icons/BatchesIcon.svg";
import { ReactComponent as ChickenIcon } from "../../assets/images/icons/ChickensIcon.svg";
import { Icon } from "@iconify/react";
import { QRCode } from "react-qrcode-logo";
import ReactToPrint from "react-to-print";
import { MyResponsiveBar, MyResponsivePie } from "../Chart";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton } from "@solana/wallet-adapter-material-ui";
import {
  CreateAccountAndGenerateBatch,
  CreateAccountAndInitialiseFarm,
} from "../../instructions";
import { PublicKey } from "@solana/web3.js";
import { checkFarmAcount } from "../../utils/checkAccount";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import GettingStarted from "../GettingStarted/GettingStarted";
import { GetBatchAccounts, GetFarmerData } from "../../utils/filters";
import { useSelector, useDispatch } from "react-redux";
import {
  setAccountData,
  setAccountPubkey,
  setWallet,
} from "../../redux/reducers/reducers";
import { useHistory } from "react-router";
import { FarmAccount } from "../../schema";
type FarmDataType = {
  farm_data: FarmAccount;
  farm_account_pubkey: string;
};
export function FarmDashboard() {
  const [newBatchPopup, setnewBatchPopup] = useState(false);
  const [navButton, setNavButton] = useState(true);
  const { connected, publicKey, sendTransaction } = useWallet();
  const [QRdata, setQRdata] = useState({});
  const { connection } = useConnection();
  const [batchData, setBatchData] = useState([]);
  const [FarmAccountData, setFarmAccountData] = useState<FarmDataType>();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setWallet({ connected: connected, pubKey: PublicKey }));
    if (publicKey && connected) {
      checkFarmAcount(
        new PublicKey("H2bq5hQFMpAPM7qD2gLMnLx6FN278MkAHKNHx1hcbaMB"),
        publicKey,
        connection
      )
        .then((farm_data) => {
          console.log(farm_data);
          if (!farm_data) {
            history.push(`getting-started/farmer`);
            window.location.assign("/getting-started/farmer")
          } else {
            console.log(farm_data);
            setFarmAccountData({
              farm_data: farm_data.farm_data,
              farm_account_pubkey: farm_data.farm_account_pubkey,
            });
            //@ts-ignore
            setBatchData(farm_data.farm_batches);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [connected, publicKey]);

  return connected && FarmAccountData?.farm_data ? (
    <div className="farm_dashboard_container container">
      {newBatchPopup ? (
        <div className="create_batch_popup">
          <CreateBatch
            setnewBatchPopup={() => setnewBatchPopup(false)}
            QRdata={QRdata}
            setQRdata={setQRdata}
            FarmAccountData={FarmAccountData}
            setBatchData={setBatchData}
            batchData={batchData}
          />
        </div>
      ) : null}
      <div className="farm_dashboard_sidebar">
        <img src={logo} alt="" />
        <div className="sidebar_navigrations">
          <button onClick={() => setNavButton(true)}>
            <Icon
              icon="ic:round-space-dashboard"
              className={navButton ? "nav_active" : ""}
            />
          </button>
          <button
            className="farm_navigation_create_button"
            onClick={() => setnewBatchPopup(true)}
          >
            +
          </button>

          <button onClick={() => setNavButton(false)}>
            <InventoryIcon className={!navButton ? "nav_active" : ""} />
          </button>
          <button className="marketplace-icon">
            <MarketPlaceIcon />
          </button>
        </div>
      </div>
      <div className="farm_dashboard">
        <div className="farm_dashboard_head">
          <div className="farm_dashboard_title">
            <h3>{navButton ? " Dashboard" : "Inventory"}</h3>
            <h4>
              hi,{" "}
              <span>
                {FarmAccountData
                  ? FarmAccountData.farm_data.farm_name
                  : "loading"}
              </span>
            </h4>
          </div>
          <WalletDisconnectButton className="farm_dashboard_wallet_button" />
        </div>
        <div className="farm_dashbord_main">
          {navButton ? (
            <Dashboard
              QRdata={QRdata}
              setQRdata={setQRdata}
              FarmAccountData={FarmAccountData}
              batchData={batchData}
              setBatchData={setBatchData}
            />
          ) : (
            <Inventory batchData={batchData} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <ConnectWallet />
  );
}

function Dashboard({
  QRdata,
  setQRdata,
  FarmAccountData,
  batchData,
  setBatchData,
}: any) {
  const [ShowQrPreview, setShowQrPreview] = useState(false);
  const [TotalSale, setTotalSale] = useState<number>(0);
  const [GeneratedBatches, setGeneratedBatches] = useState<number>(0);
  const [totalChickens, settotalChickens] = useState<number>(0);
  useEffect(() => {
    let SoldBatches = 0;
    let GeneratedBatches = 0;
    let totalchicken = 0;
    batchData.map(
      //@ts-ignore
      (batch) => {
        if (batch.distributor_pubkey != PublicKey.default.toString()) {
          SoldBatches++;
          setTotalSale(SoldBatches);
        } else {
          GeneratedBatches++;
          setGeneratedBatches(GeneratedBatches);
        }
        totalchicken += batch.batch_size;
        settotalChickens(totalchicken);
      }
    );
    setTotalSale(SoldBatches);
  }, [batchData]);
  return (
    <>
      <div className="farm_dashboard_anlaytics">
        <div className="farm_dashboard_analytics_info">
          <div className="analytics_filter analytics_filter_mobile ">
            <button className="weekly-button">Weely</button>
            <button className="monthly-button">Monthly</button>
          </div>
          <div className="farm_dashboard_analytics_bar">
            <div
              className="bar_graph"
              style={{ width: "100%", height: "200px" }}
            >
              <MyResponsiveBar />
            </div>
            {/* <img src={bargraph} alt="" style={{ height: "60%" }} /> */}
            <div className="analytics_bar_sale">
              <h3>
                {totalChickens}
                <h5>Chickens</h5>
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
                <h3>{GeneratedBatches}</h3>
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
                <h3>{TotalSale}</h3>
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
              <th></th>
            </tr>

            {batchData.length != 0
              ? //@ts-ignore
                batchData.map((batch) => {
                  return (
                    <tr className="recent_table_content">
                      <th>test</th>
                      <th>11:10</th>
                      <th>{batch.batch_id}</th>
                      <th>{batch.batch_size}</th>
                      <th>
                        <button
                          onClick={() => {
                            setQRdata({
                              batch_id: batch.batch_id,
                              batch_size: batch.batch_size,
                              key: batch.batch_pubkey,
                              timestamp: batch.timestamp,
                            });
                            setShowQrPreview(true);
                          }}
                        >
                          <Icon
                            icon="heroicons-outline:qrcode"
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "#FF9900",
                            }}
                          />
                        </button>
                      </th>
                      <th>
                        <button>
                          <Icon
                            icon="ant-design:delete-outlined"
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "red",
                            }}
                          />
                        </button>
                      </th>
                    </tr>
                  );
                })
              : "No Data"}
          </table>
        </div>
      </div>
      <CreateBatch
        ShowQrPreview={ShowQrPreview}
        setShowQrPreview={setShowQrPreview}
        QRdata={QRdata}
        setQRdata={setQRdata}
        FarmAccountData={FarmAccountData}
        batchData={batchData}
        setBatchData={setBatchData}
      />
    </>
  );
}
function CreateBatch({
  setnewBatchPopup,
  ShowQrPreview,
  setShowQrPreview,
  QRdata,
  setQRdata,
  FarmAccountData,
  setBatchData,
  batchData,
}: any): JSX.Element {
  const [BatchSize, setBatchSize] = useState(0);
  const [CreateQr, setCreateQr] = useState(false);
  const printComponent = useRef(null);
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const pageStyle = `
  @page {
    size: 100mm 100mm;
    margin:30px;
  }

`;
  useEffect(() => {}, [connected]);

  function GenerateNewBatch() {
    const batch_input = {
      batch_id: Math.floor(Math.random() * 4294967295 + 1),
      batch_size: BatchSize,
      timestamp: Date.now(),
    };
    if (publicKey && connected) {
      CreateAccountAndGenerateBatch(
        new PublicKey("H2bq5hQFMpAPM7qD2gLMnLx6FN278MkAHKNHx1hcbaMB"),
        publicKey,
        publicKey,
        batch_input,
        connection,
        sendTransaction
      )
        .then((Batch_pubkey) => {
          setQRdata({
            batch_id: batch_input.batch_id,
            batch_size: batch_input.batch_size,
            key: Batch_pubkey,
            timestamp: batch_input.timestamp,
          });
          setCreateQr(true);
          setBatchData([
            ...batchData,
            {
              batch_id: batch_input.batch_id,
              batch_pubkey: Batch_pubkey,
              distributor_pubkey: PublicKey.default.toString(),
              batch_size: batch_input.batch_size,
              generated_at: batch_input.timestamp,
            },
          ]);
          console.log(batch_input);
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className="farm_dashboard_create_batch">
      <button className="close_batch_popup" onClick={() => setnewBatchPopup()}>
        <Icon icon="iconoir:cancel" />
      </button>
      <div className="create_batch_title">
        <h3>Create New Batch</h3>
      </div>
      <div className="create_batch">
        <div className="create_batch_input">
          <button onClick={() => setBatchSize(BatchSize - 1)}>-</button>
          <input
            type="number"
            placeholder="No. of chickens"
            onChange={(e) => setBatchSize(Number(e.target.value))}
            value={BatchSize}
          />{" "}
          <button onClick={() => setBatchSize(BatchSize + 1)}>+</button>
        </div>
        <button
          className="create_batch_button"
          onClick={() => {
            GenerateNewBatch();
          }}
        >
          Create
        </button>
      </div>

      <div className="generated_batch_qrcode">
        <h3>QR Code Preview</h3>
        {CreateQr || ShowQrPreview ? (
          <div className="print-container" ref={printComponent}>
            <h3>Batch ID: {QRdata.batch_id}</h3>
            <QRCode
              value={JSON.stringify(QRdata)}
              logoImage={logo}
              logoWidth={45}
              logoHeight={50}
              eyeRadius={7}
              qrStyle={"dots"}
            />
            <h3>{FarmAccountData.farm_data.farm_name}</h3>
          </div>
        ) : (
          <img src={qrnopreview} />
        )}
      </div>
      <div className="qr_print_section">
        <h3>Print</h3>
        <div className="qr_print_buttons">
          <ReactToPrint
            pageStyle={pageStyle}
            copyStyles={true}
            trigger={() => (
              <button>
                {" "}
                <img
                  src={qricon}
                  alt=""
                  style={{ width: "15px", marginRight: "5px" }}
                />
                Single QR
              </button>
            )}
            content={() => printComponent.current}
          />

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
  );
}
export function Inventory({ batchData }: any) {
  const [TotalSale, setTotalSale] = useState<number>(0);
  const [GeneratedBatches, setGeneratedBatches] = useState<number>(0);
  const [totalChickens, settotalChickens] = useState<number>(0);
  useEffect(() => {
    let SoldBatches = 0;
    let GeneratedBatches = 0;
    let totalchicken = 0;
    batchData.map(
      //@ts-ignore
      (batch) => {
        if (batch.distributor_pubkey != PublicKey.default.toString()) {
          SoldBatches++;
          setTotalSale(SoldBatches);
        } else {
          GeneratedBatches++;
          setGeneratedBatches(GeneratedBatches);
        }
        totalchicken += batch.batch_size;
        settotalChickens(totalchicken);
      }
    );
    setTotalSale(SoldBatches);
  }, [batchData]);
  return (
    <div className="inventory_main">
      <div className="farm_inventory_analysis_section">
        <div className="farm_inventory_summary">
          <h3>Inventory Summary</h3>
          <div className="farm_inventory_summary_info_blocks">
            <div className="farm_inventory_summary_batches">
              <div className="inventory_summary_data">
                <h3>{GeneratedBatches}</h3>
                <h4>batches</h4>
              </div>
              <BatchesIcon />
            </div>
            <div className="farm_inventory_summary_chickens">
              <div className="inventory_summary_data">
                <h3>{totalChickens}</h3>
                <h4>Chickens</h4>
              </div>
              <ChickenIcon />
            </div>
          </div>
        </div>
        <div className="farm_inventory_market_summary">
          <h3>Market Summary</h3>
          <div className="bar_graph" style={{ width: "100%", height: "200px" }}>
            <MyResponsivePie />
          </div>{" "}
        </div>
      </div>
      <div className="farm_dashboard_inventory">
        <div className="farm_dashboard_analytics_history">
          <div className="farm_dashboard_analytics_history_head">
            <h3>Inventory</h3>
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
              <th></th>
            </tr>
            {batchData.length != 0
              ? //@ts-ignore
                batchData.map((batch) => {
                  return (
                    <tr className="recent_table_content">
                      <th>test</th>
                      <th>11:10</th>
                      <th>{batch.batch_id}</th>
                      <th>{batch.batch_size}</th>
                      <th>
                        <button>
                          <Icon
                            icon="heroicons-outline:qrcode"
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "#FF9900",
                            }}
                          />
                        </button>
                      </th>
                      <th>
                        <button>
                          <Icon
                            icon="ant-design:delete-outlined"
                            style={{
                              width: "30px",
                              height: "30px",
                              color: "red",
                            }}
                          />
                        </button>
                      </th>
                    </tr>
                  );
                })
              : "No Data"}
          </table>
        </div>
      </div>
    </div>
  );
}
