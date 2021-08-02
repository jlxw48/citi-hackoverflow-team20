import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserHome from "./UserHome.js";
import UserShop from "./UserShop.js";
import UserRedeem from "./UserRedeem.js";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/usershop">Shop for vouchers</Link>
            </li>
            <li>
              <Link to="/userredeem">Redeem my vouchers</Link>
            </li>

          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/usershop">
            <UserShop />
          </Route>
          <Route path="/userredeem">
            <UserRedeem />
          </Route>
          <Route path="/">
            <UserHome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App;
