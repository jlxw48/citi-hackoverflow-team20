import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import BLUE from "./../utils/Color";
const CashierHome = () => {
  const history = useHistory();
  const location = useLocation();
  if (!location.state) {
    return <Redirect to="/"></Redirect>;
  }
  const navigateToTransactionPage = () => {
    history.push({
      pathname: "/cashier/transaction",
      state: { cashierid: location.state.cashierid },
    });
  };
  return (
    <center>
      <h1 style={{ marginTop: "100px" }}>You are logged in as:</h1>
      <h1>Jimmy</h1>
      <Button
        onClick={navigateToTransactionPage}
        style={{
          marginTop: "5%",
          color: "white",
          fontWeight: "bold",
          padding: "2%",
          backgroundColor: BLUE,
          textAlign: "center",
        }}
      >
        Proceed To Scan
      </Button>
    </center>
  );
};

export default CashierHome;
