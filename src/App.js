import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserHome from "./UserHome.js";
import UserShop from "./UserShop.js";
import UserRedeem from "./UserRedeem.js";
import NavigationBar from "./Navigation/NavigationBar";
import Login from "./Login";
import UserQR from "./UserQR.js"

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/citi" component={NavigationBar} />
        <Route path="/citi/homepage" component={UserHome} />
        <Route path="/citi/shop" component={UserShop} />
        <Route path="/citi/redeem" component={UserRedeem} />
        <Route path="/citi/qr" component={UserQR} />
      </Router>
    </>
  );
}

export default App;
