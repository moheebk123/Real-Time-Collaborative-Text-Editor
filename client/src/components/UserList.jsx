import PropTypes from "prop-types";
import User from "./User";
import List from "@mui/material/List";

const UserList = ({ users, individual }) => {
  return (
    <div className="list-box">
      <h2>Users</h2>
      <List dense sx={{ width: "100%", maxWidth: 360 }}>
        {users.map((user, index) => {
          return (
            <User
              key={index}
              id={index}
              individual={individual}
              userName={user.name}
              userStatus={user.status}
            />
          );
        })}
      </List>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  individual: PropTypes.string.isRequired,
};

export default UserList;
