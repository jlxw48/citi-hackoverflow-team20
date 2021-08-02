import database from "./firebase.js"

function UserHome() {
  const response = database.collection("user/tom@gmail.com");
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

const fetchdata=async()=>{
  const response=database.collection('user');
  const data=await response.get();
}
export default UserHome;
