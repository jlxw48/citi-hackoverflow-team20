import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserHome from "./User/UserHome.js";
import UserShop from "./User/UserShop.js";
import UserRedeem from "./User/UserRedeem.js";
import Login from "./Login";
import QRScan from "./cashier/QRScan";
import Transaction from "./cashier/Transaction";
import TopBar from "./cashier/TopBar";
import UserSignUp from "./UserSignUp";
import ScannedVoucherPage from "./cashier/ScannedVoucherPage";
import CashierSignUp from "./CashierSignUp";
import CashierHome from "./cashier/CashierHome";
import TransactionComplete from "./cashier/TransactionComplete";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/user/signup" component={UserSignUp} />
        <Route exact path="/cashier/signup" component={CashierSignUp} />

        <Route path="/cashier" component={TopBar} />
        <Route exact path="/cashier/qr" component={QRScan} />
        <Route exact path="/cashier/homepage" component={CashierHome} />
        <Route exact path="/cashier/complete" component={TransactionComplete} />

        <Route exact path="/cashier/transaction" component={Transaction} />
        <Route exact path="/citi/homepage" component={UserHome} />
        <Route exact path="/citi/shop" component={UserShop} />
        <Route exact path="/citi/redeem/:voucherid/" component={UserRedeem} />
        <Route
          exact
          path="/cashier/voucher/:voucherid/"
          component={ScannedVoucherPage}
        />
      </Router>
    </>
  );
}

export default App;
