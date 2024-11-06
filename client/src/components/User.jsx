import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

const User = ({ id, individual, userName, userStatus }) => {
  if (individual === userName) {
    return (
      <ListItem className="list-item individual" key={id}>
      <ListItemText id={id} primary={userName} />
        <Button className="status-button" color="primary" variant="contained">
          {userStatus}
        </Button>
      </ListItem>
    );
  } else {
    return (
      <ListItem className="list-item" key={id}>
      <ListItemText id={id} primary={userName} />
        <Button className="status-button" color="primary" variant="contained">
          {userStatus}
        </Button>
      </ListItem>
    );
  }
};

User.propTypes = {
  id: PropTypes.number.isRequired,
  individual: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
};

export default User;
