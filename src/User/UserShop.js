import {database} from "../firebase.js"
import React, { useState, useEffect } from 'react';
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
import './usershop.css';
import { Redirect, Link, useLocation } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.js";

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

function UserShop() {
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    if (!location.state) {
      return ;
    } 

    getVouchers();
  }, []);

  if (!location.state) {
    return <Redirect to='/'></Redirect>
  }

  const voucherRef = database.collection("vouchertype")
  const userRef = database.collection("user").doc(location.state.userid)
  var modal = document.getElementById("myModal");

  async function getVouchers() {
    await voucherRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setVouchers(items);
      console.log("vouchers", items)
      setLoading(false)
    });
  }

  const buyVoucher = (voucherPoints, voucherid) => {
    modal.style.display = "block";
    // get this user's points

    userRef.get()
      .then(async docSnapshot => {
        var points = docSnapshot.data().loyalty
        var purchased = docSnapshot.data().purchased
        await userRef.update({
          loyalty: points - voucherPoints,
          purchased: purchased.push(voucherid)
        })
      })
  }

  const closeModal = () => {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target === modal) {
      modal.style.display = "none";
      }
  };

  return (
    <div>
      <NavigationBar userid={location.state.userid}/>

<React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Shop Vouchers
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Purchase vouchers below! 
            </Typography>
            <div className={classes.heroButtons}>
            </div>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={5}>
            {vouchers.map((voucher) => (
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
                        <p>Expiry Date: {new Date(voucher.expiry).toLocaleDateString()}</p>
                        </div>
                  </CardContent>


                  <CardActions>
                    <Button size="small" color="primary" id="myBtn" onClick={() => buyVoucher(voucher.points, voucher.id)}>
                      Purchase
                    </Button>

                    <div id="myModal" class="modal">
                        <div class="modal-content">
                            <span class="close" onClick={closeModal}>&times;</span>
                            <p>Voucher Purchased!</p>
                        </div>

                    </div>


                  </CardActions>

                </Card>

              </Grid>
            ))}

          </Grid>
        </Container>
      </main>
    </React.Fragment>
    </div>
    
  )
}


export default UserShop;