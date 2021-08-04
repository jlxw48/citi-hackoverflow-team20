import {database} from "../firebase.js"
import React, { useState, useEffect, } from 'react';
import { Redirect, Link, useLocation, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavigationBar from "./components/NavigationBar.js";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function UserHome() {
  const [vouchers, setVouchers] = useState([])
  const ref = database.collection("voucher")
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const userRef = database.collection("user").doc(location.state.userid)
  const voucherRef = database.collection("voucher")

  function getVouchers() {
    ref.where("user", "==", userRef).get().then((item) => {
      const items = item.docs.map((doc) => {
        const voucher = {...doc.data(), id: doc.id}
        return voucher;
      });
      setVouchers(items);
    });
  }
  useEffect(() => {
    if (location.state === null) {
      return
    }
    console.log("getting vouchers")
    getVouchers();
    // eslint-disable-next-line
  }, []);

  if (!location.state) {
    return <Redirect to='/'></Redirect>
  }

  // async function getVouchers() {
  //   if (location.state === null) {
  //     return
  //   } 

  //   await userRef.get().then(docSnapshot => {
  //     const vouchers = docSnapshot.data().purchased
  //     const voucherObjArr = []

  //     vouchers.forEach(async v => {
  //       console.log(v)
  //       await voucherRef.doc(v).get().then(doc => {
  //         console.log(doc, doc.id)
  //         voucherObjArr.push({
  //           ...doc.data(),
  //           id: doc.id
  //         })
  //       })
  //     })
  //     setVouchers(voucherObjArr);
  //   });
  // }

  function moveToShopPg(e) {
    history.push({
      pathname: "/citi/shop",
      state: { userid: location.state.userid },
    })
  }

  function moveToRedeemPg(voucherID) {
    history.push({
      pathname: "/citi/redeem/" + voucherID,
      state: { userid: location.state.userid },
    })
  }

  return (
    <div>
      <NavigationBar />
      <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              My Vouchers
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              View your purchased vouchers below! 
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={moveToShopPg}>
                    Purchase More Vouchers!
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={5}>
            {vouchers.map((voucher) => {
              const voucherID = voucher.id
              return (
              
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.voucher}>

                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />

                  <CardContent className={classes.cardContent}>
                        <div key={voucher.id}>
                        <h2>{voucher.name}</h2>
                        <p>{voucher.details}</p>
                        {/* <p>Expiry Date: {new Date(voucher.expiry.seconds*1000).toLocaleDateString()}</p> */}
                        </div>
                  </CardContent>


                  <CardActions>
                    <Button size="small" color="primary"  onClick= {() => moveToRedeemPg(voucherID)}>
                      Redeem
                    </Button>
                  </CardActions>

                </Card>

              </Grid>
            )})}

          </Grid>
        </Container>
      </main>
    </React.Fragment>
    </div>
  )
}


export default UserHome;