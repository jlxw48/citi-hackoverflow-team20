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
  console.log(voucherID)

  const [vouchers, setVouchers] = useState([])
  const ref = database.collection("voucher")

  function getVouchers() {
    database.collection("voucher").where('__name__', '==' , voucherID).get().then((snapshot) => {
      const v = snapshot.docs.map((doc) => doc.data());
      setVouchers(v);
      console.log(vouchers);
    });
  }
  useEffect(() => {
    getVouchers();
    // eslint-disable-next-line
  }, []);
  
  return (
    <Container maxWidth="lg">
    <Grid item xs={12} lg={12}>
      {vouchers.map((voucher) => (
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
          <div key={voucher.id}>
            <CardContent>
              <Typography component="h1" variant="h4" >
                {voucher.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
              {/* Expiry Date: {new Date(voucher.expiry.seconds*1000).toLocaleDateString()} */}
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
                  <QRCode style = {{marginLeft: "50px", marginTop: "50px"}} value = "0.4" justifyContent="center">
                    </QRCode>
                  </CardActions>
            </CardContent>
            </div>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Image Title" />
          </Hidden>
        </Card>
      </CardActionArea>
    ))}
    </Grid>
    </Container>
  );
}

// 

//   return (
//     <div>
//       <h2>REDEEM</h2>
//           {loading ? <h1>Loading...</h1> : null}
//           {users.map((user) => (
//             <div key={user.email}>
//               <h2>{user.email}</h2>
//               <p>{user.loyalty}</p>
//               <p>{user.name}</p>
//               {/* <p>{user.purchased}</p> */}
//               </div>
//             ))}
//     </div>
//   )
// }


export default UserRedeem;


// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import Link from '@material-ui/core/Link';

// const useStyles = makeStyles((theme) => ({
//   mainFeaturedPost: {
//     position: 'relative',
//     backgroundColor: theme.palette.grey[800],
//     color: theme.palette.common.white,
//     marginBottom: theme.spacing(4),
//     backgroundImage: 'url(https://source.unsplash.com/random)',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     right: 0,
//     left: 0,
//     backgroundColor: 'rgba(0,0,0,.3)',
//   },
//   mainFeaturedPostContent: {
//     position: 'relative',
//     padding: theme.spacing(3),
//     [theme.breakpoints.up('md')]: {
//       padding: theme.spacing(6),
//       paddingRight: 0,
//     },
//   },
// }));

// function UserRedeem() {
//   const classes = useStyles();

//   const [vouchers, setVouchers] = useState([])
//   const ref = database.collection("voucher")
  
//   const userRef = database.collection("user").doc("tom@gmail.com")

//   function getVouchers() {
//     ref.where("user", "==", userRef).get().then((item) => {
//       const items = item.docs.map((doc) => doc.data());
//       setVouchers(items);
//       console.log(items)
//     });
//   }
//   useEffect(() => {
//     getVouchers();
//     // eslint-disable-next-line
//   }, []);


//   return (
//     <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: 'url(https://source.unsplash.com/random)'}}>
//       {/* Increase the priority of the hero background image */}
//       {<img style={{ display: 'none' }} src='url(https://source.unsplash.com/random)' alt="Image"/>}
//       <div className={classes.overlay} />
//       <Grid container>
//         {vouchers.map((voucher) => (
//         <div key={voucher.id}>
//         <Grid item md={6}>
//           <div className={classes.mainFeaturedPostContent}>
//             <Typography component="h1" variant="h3" color="inherit" gutterBottom>
//               {voucher.name}
//             </Typography>
//             <Typography variant="h5" color="inherit" paragraph>
//               {voucher.details}
//             </Typography>
//             <Link variant="subtitle1" href="#">
//               Terms and Conditions
//             </Link>
//           </div>
//         </Grid>
//         </div>
//         ))}
//       </Grid>
//     </Paper>
    
//   );
// }

// export default UserRedeem;