import {database} from "../firebase.js"
import React, { useState, useEffect } from 'react';

function ScannedVoucherPage(props) {
  const [voucher, setVoucher] = useState(null)
  const [loading, setLoading] = useState(false)
  const [validVoucher, setValidVoucher] = useState(false)

  const voucherCollection = database.collection("voucher")

  function getVoucher() {
    setLoading(true);
    voucherCollection
        .doc(props.match.params.voucherid)
        .get()
        .then(docSnapshot => {
            if (docSnapshot.exists) {
                setVoucher(docSnapshot.data())
                console.log(docSnapshot.data())
            } else {
                console.log("voucher does not exist")
            }
            setLoading(false);
        });
  }

  function validateVoucher() {
    if (voucher === null) {
        return false;    
    }
    if (voucher.expiry) {
        if (voucher.expiry.toMillis() < Date.now()) {
            console.log("voucher expired")
        } else {
            setValidVoucher(true)
            console.log("voucher expiry not yet", voucher.expiry)
        }
    }
  }

  useEffect(() => {
    getVoucher();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    validateVoucher();
    // eslint-disable-next-line
  }, [voucher]);

  return (
    <div>
        {loading ? <h2>Loading...</h2> : voucher === null ? <h2>Invalid Voucher</h2> : <h2>Valid Voucher</h2>}
        
    </div>
  )
}


export default ScannedVoucherPage;