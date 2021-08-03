import React from 'react';
import QRCode from "qrcode.react"
import Button from '@material-ui/core/Button';


const UserQR = () => {
  return (
    <div>
      <QRCode style = {{marginLeft: "50px", marginTop: "50px"}} value = "0.4" justifyContent="center">
      </QRCode>
      <p></p>
      <Button style = {{marginLeft: "50px"}} size="big" color="primary" variant = "outlined" onClick={event =>  window.location.href='/citi/homepage'}>
        Done
      </Button>
    </div>
  )
}

export default UserQR;
