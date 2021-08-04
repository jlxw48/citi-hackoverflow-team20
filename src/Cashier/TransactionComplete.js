import TransactionAnimation from "../Asset/txn.json";
import React from "react";
import Lottie from "react-lottie";
import { useLocation } from "react-router-dom";

const TransactionComplete = (props) => {
  const location = useLocation();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: TransactionAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (location.state) {
    return (
      <center style={{ padding: "10px" }}>
        <Lottie options={defaultOptions} height={400} width={400} />
        <h1>Transaction Completed </h1>
        <h1>Total Paid: ${location.state.data}</h1>
      </center>
    );
  }
};

export default TransactionComplete;
