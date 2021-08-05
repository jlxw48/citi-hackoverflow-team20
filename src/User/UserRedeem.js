import {database} from "../firebase.js"
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import QRCode from "qrcode.react"
import { Redirect, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.js";

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    margin: theme.spacing(4, 0, 6),
    backgroundColor: theme.palette.background.paper,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 300,
  },
}));

function UserRedeem(props) {
  const classes = useStyles();
  const voucherID = props.match.params.voucherid
  const [vouchers, setVouchers] = useState([])
  const location = useLocation();
  
  useEffect(() => {
    if (!location.state) {
      return ;
    } 
    getVouchers();
    // eslint-disable-next-line
  }, []);

  if (!location.state) {
    return <Redirect to='/'></Redirect>
  }

  function getVouchers() {
    database.collection("voucher").where('__name__', '==' , voucherID).get().then((snapshot) => {
      const v = snapshot.docs.map((doc) => doc.data());
      setVouchers(v);
    });
  }
  
  return (
    <div>
      <NavigationBar userid={location.state.userid} />
      <Container maxWidth="lg">
    <Grid item xs={12} lg={12}>
      {vouchers.map((voucher) => (
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
          <div key={voucher.id}>
            <CardContent>
              <Typography component="h1" variant="h4" >
                {voucher.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {voucher.details}
              </Typography>
              <Typography component="h6" variant="h6">
                Terms and Condition:
              </Typography>

              <Typography variant="subtitle1">
                
                <p>1. Information on how to participate forms part of these Terms & Conditions. By participating, claimants agree to be bound by these Terms & Conditions. Claimants must comply with these Terms & Conditions for a coupon to be valid.</p>

                <p>2. Each claimant is entitled to one coupon per accommodation establishment. Coupons are not transferable and are not redeemable for cash and cannot be combined with any other coupons or any other offer or discounts or promotions offered by Quovai.</p>

                <p>3. Each coupon is identified by a code and has different rewards. The claimant can decide the reward desired during the booking phase whilst being bound by the conditions linked to the redemption of the coupon.</p>
              </Typography>
                  <CardActions>
                  <br></br>
                  <QRCode style = {{marginLeft: "50px", marginTop: "50px"}} value = {voucherID} justifyContent="center">
                    </QRCode>
                  </CardActions>
              </CardContent>
              </div>
              </div>
                <Hidden xsDown>
                  <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Image Title" />
                </Hidden>
          </Card>
      ))}
      </Grid>
    </Container>
    </div>
  );
}

export default UserRedeem;