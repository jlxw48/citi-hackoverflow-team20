import {database} from "./firebase.js"

function UserHome() {
  const response = database.collection("user/");
  return (
    <div>
      <h2>HOMEEEE</h2>
        <ul>
          <li>
            {response.name}
          </li>
        </ul>
    </div>
  )
}

export default UserHome;
