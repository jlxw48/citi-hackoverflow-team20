import {database} from "./firebase.js"
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import './usershop.css';

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

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];


function UserShop() {
  const [vouchers, setVouchers] = useState([])

  const refVT = database.collection("vouchertype")
  const refUser = database.collection("user")
  const refV = database.collection("voucher")

  const classes = useStyles();
  const userRef = database.collection("user").doc("96da117d-1573-43a2-9b87-7e6cf23d22fc")

  function getVouchers() {
    refVT.get().then((item) => {
      const items = item.docs.map((doc) => {
        const voucher = {...doc.data(), id: doc.id}
        return voucher;
      });
      setVouchers(items);
    });
  }

  useEffect(() => {
    getVouchers();
  }, []);
  
  span.onclick = function() {
    modal.style.display = "none";
};

  window.onclick = function(event) {
      if (event.target == modal) {
      modal.style.display = "none";
      }
  };


  function purchaseVoucher(VT) {
    modal.style.display = "block";

    refV.add({
      name: VT.name,
      details: VT.details,
      user: userRef,
      vouchertype: VT,
      expiry: VT.expiry
    })
      .then(docRef => {
        userRef.get()
        .then(async docSnapshot => {
          var points = docSnapshot.data().loyalty
          var purchased = [...docSnapshot.data().purchased, docRef.id]
          await userRef.update({
            loyalty: points - VT.points,
            purchased: purchased
          })
        })
      })
  }

  return (
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
                        <p>Expiry Date: {new Date(voucher.expiry.seconds*1000).toLocaleDateString()}</p>
                        </div>
                  </CardContent>


                  <CardActions>
                    <Button size="small" color="primary" id="myBtn" onClick={() => purchaseVoucher(voucher)}>
                      Purchase
                    </Button>

                    <div id="myModal" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
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
  )
}


export default UserShop;