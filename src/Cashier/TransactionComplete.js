import TransactionAnimation from "../Asset/txn.json";
import React from "react";
import Lottie from "react-lottie";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import BLUE from "../utils/Color";

const TransactionComplete = (props) => {
  const location = useLocation();
  const history = useHistory();
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: TransactionAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const navigateToHomePage = () => {
    history.push({
      pathname: "/cashier/homepage",
      state: { cashierid: location.state.cashierid },
    });
  };
  if (location.state) {
    return (
      <center style={{ padding: "10px" }}>
        <Lottie options={defaultOptions} height={400} width={400} />
        <h1>Transaction Completed </h1>
        <h1>Total Paid: ${location.state.data}</h1>
        <Button
          onClick={navigateToHomePage}
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
          Back To Home Page
        </Button>
      </center>
    );
  }
};

export default TransactionComplete;
