import React from "react";
import Table from "./Table";
import Button from "@material-ui/core/Button";
import { Link, useLocation } from "react-router-dom";

const Transaction = () => {
  const location = useLocation();
  return (
    <div style={{ width: "90%", marginLeft: "5%", marginRight: "5%" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h2>Transactions</h2>

        <Button
          component={Link}
          to="/cashier/qr"
          variant="contained"
          style={{
            backgroundColor: "red",
            marginLeft: "25%",
            fontWeight: "bolder",
            marginTop: "5%",
            marginBottom: "5%",
            position: "relative",
          }}
        >
          QR Scan
        </Button>
      </div>
      <Table
        discount={
          typeof location.state === "undefined" ? 0 : location.state.data
        }
      />
    </div>
  );
};

export default Transaction;
