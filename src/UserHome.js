import {database} from "./firebase.js"

var userRef = database.collection("user").doc("tom@gmail.com")
function UserHome() {
  userRef.get().then((doc) => {
    if (doc.exists) {
      console.log(doc.data)
    }

  })
  return (
    <div>
      <h2>HOMEEEE</h2>
        <ul>
          <li>

          </li>
        </ul>
    </div>
  )
}

export default UserHome;
