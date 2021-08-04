import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserHome from "./UserHome.js";
import UserShop from "./UserShop.js";
import UserRedeem from "./UserRedeem.js";
import NavigationBar from "./components/NavigationBar";
import Login from "./Login";
import QRScan from "./cashier/QRScan";
import Transaction from "./cashier/Transaction";
import TopBar from "./cashier/TopBar";
import ScannedVoucherPage from "./cashier/ScannedVoucherPage";
import UserSignUp from "./UserSignUp";
import CashierSignUp from "./CashierSignUp";


function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/user/signup" component={UserSignUp} />
        <Route exact path="/cashier/signup" component={CashierSignUp} />
        <Route path="/citi" component={NavigationBar} />

        <Route path="/cashier" component={TopBar} />
        <Route exact path="/cashier/qr" component={QRScan} />
        <Route exact path="/cashier/transaction" component={Transaction} />
        <Route exact path="/citi/homepage" component={UserHome} />
        <Route exact path="/citi/shop" component={UserShop} />
        <Route exact path="/citi/redeem" component={UserRedeem} />
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
