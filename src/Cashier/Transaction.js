import React from "react";
import Table from "./Table";
import Button from "@material-ui/core/Button";
import { Redirect, Link, useLocation } from "react-router-dom";
import BLUE from "../utils/Color";

const Transaction = () => {
  const location = useLocation();
  if (!location.state) {
    return <Redirect to='/'></Redirect>
  }

  return (
    <div style={{ width: "90%", marginLeft: "5%", marginRight: "5%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h2>Transactions</h2>

        <Button
          component={Link}
          to="/cashier/qr"
          variant="contained"
          style={{
            backgroundColor: BLUE,
            display: "block",
            marginTop: "1.5em",
            marginBottom: "1em",
            fontWeight: "bold",
            height: "50%",
            color: "white",
          }}
        >
          QR Scan
        </Button>
      </div>
      <Table
        discount={
          typeof location.state.data === "undefined" ? 0 : location.state.data
        }
      />
    </div>
  );
};

export default Transaction;
