import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
const QRScan = () => {
  const [result, setResult] = useState("No QR Detected");
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
  };
  const handleRedeem = () => {
    history.push({
      pathname: "/Cashier/Transaction",
      state: {
        data: result,
      },
    });
  };
  const handleScan = (data) => {
    if (data) {
      try {
        setResult(Number(data));
        setOpen(true);
      } catch (e) {
        setResult("Incorrect Data Format!");
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <center>
        <h2>Scan Your QR Code</h2>
      </center>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Use Of QR Code"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voucher of {result * 100}% detected. Do you want to redeem it now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRedeem} color="primary" autoFocus>
            Redeem
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default QRScan;
