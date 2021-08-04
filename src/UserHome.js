import {database} from "./firebase.js"
import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from "react-router-dom";

function UserHome() {
  const location = useLocation();
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (location.state === null) {
      return;
    }
    
    getUsers(location.state.userid);
    // eslint-disable-next-line
  }, []);

  if (!location.state) {
    return <Redirect to='/'></Redirect>
  }

  const ref = database.collection("user")

  function getUsers(userid) {
    ref.doc(userid)
      .get()
      .then(docSnapshot => {
        setUser(docSnapshot.data())
        setLoading(false);
      })
      .catch(error => console.log(error.message))
  }

  return (
    <div>
      <h2>HOMEEEE of {user.name}</h2>
        <ul>
          <li>
          {loading ? <h1>Loading...</h1> : null}
          {/* {users.map((user) => (
            <div key={user.email}>
              <h2>{user.email}</h2>
              <p>{user.loyalty}</p>
              <p>{user.name}</p>
              </div>
          ))} */}
          </li>
        </ul>
    </div>
  )
}


export default UserHome;