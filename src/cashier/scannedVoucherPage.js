import {database} from "../firebase.js"
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ValidVoucher from "./components/ValidVoucherComponent.js";
import InvalidVoucher from "./components/InvalidVoucherComponent.js";
import { Spinner } from "react-bootstrap";

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

function ScannedVoucherPage(props) {
  const [voucher, setVoucher] = useState(null)
  const [loading, setLoading] = useState(true)
  const classes = useStyles();

  const voucherCollection = database.collection("voucher")

  function getVoucher() {
    setLoading(true);
    voucherCollection
        .doc(props.match.params.voucherid)
        .get()
        .then(docSnapshot => {
            if (docSnapshot.exists) {
              if (validateVoucher(docSnapshot.data())) {
                docSnapshot
                  .data()
                  .vouchertype
                  .get()
                  .then(doc => {
                    const voucherDetails = {
                      ...docSnapshot.data(),
                      value: doc.data().value
                    }
                    setVoucher(voucherDetails)
                  });
              }
            } else {
                console.log("voucher does not exist")
            }
            setLoading(false);
        });
  }

  function validateVoucher(voucher) {
    if (voucher === null) {
        return false;    
    }
    if (voucher.expiry) {
        if (voucher.expiry.toMillis() < Date.now()) {
            console.log("voucher expired")
            return false;
        } else {
            console.log("voucher expiry not yet", voucher.expiry)
            return true;
        }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getVoucher();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md" align="center">
            {loading ? <h1>Checking Voucher Status...</h1> : voucher === null ? <h1>Invalid Voucher</h1> : <h1>Valid Voucher</h1>}
          </Container>
        </div>

        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
          {(() => {
            if (loading) {
              return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
            } else {
              if (!voucher) {
                return <InvalidVoucher classes={classes}></InvalidVoucher>
              }
  
              return <ValidVoucher voucher={voucher} classes={classes}></ValidVoucher>
            }
          })()}
        </div>
        
      </main>
    </div>
  )
}


export default ScannedVoucherPage;