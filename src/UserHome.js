import {database} from "./firebase.js"
import React, { useState, useEffect } from 'react';

function UserHome() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const ref = database.collection("user")

  function getUsers() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setUsers(items);
      setLoading(false);
      console.log(items)
    });
  }
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>HOMEEEE</h2>
        <ul>
          <li>
          {loading ? <h1>Loading...</h1> : null}
          {users.map((user) => (
            <div key={user.email}>
              <h2>{user.email}</h2>
              <p>{user.loyalty}</p>
              <p>{user.name}</p>
              </div>
          ))}
          </li>
        </ul>
    </div>
  )
}


export default UserHome;