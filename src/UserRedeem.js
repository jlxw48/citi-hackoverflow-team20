import {database} from "./firebase.js"
import React, { useState, useEffect } from 'react';

function UserRedeem() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

 
  const ref = database.collection("user")

  function getUsers() {
    setLoading(true);
    ref.where("email", "==", "tom@gmail.com").get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setUsers(items);
      setLoading(false);
      console.log(items.purchased);
    });
  }


  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>REDEEM</h2>
          {loading ? <h1>Loading...</h1> : null}
          {users.map((user) => (
            <div key={user.email}>
              <h2>{user.email}</h2>
              <p>{user.loyalty}</p>
              <p>{user.name}</p>
              {/* <p>{user.purchased}</p> */}
              </div>
            ))}
    </div>
  )
}


export default UserRedeem;