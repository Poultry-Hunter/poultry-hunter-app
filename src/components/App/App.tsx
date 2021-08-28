import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { DistributorAccount, SCHEMA } from "../../schema";
import * as borsh from "borsh";
import "./App.css";

export const App = (): JSX.Element => {
  const data = new DistributorAccount(
    "rhutik distributor",
    "rhutik",
    "moon",
    "9735552",
    0
  );
  const test = borsh.serialize(SCHEMA, data);
  const Buffers = Buffer.from(test);
  //@ts-ignore
  const t = borsh.deserialize(SCHEMA, DistributorAccount, Buffers)
  console.log(t);
  
  return (
    <>
      <div>
        <h1>Hello TS</h1>
      </div>
    </>
  );
};
