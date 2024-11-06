import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import Fab from "@mui/material/Fab";

const ActionButton = ({
  editable,
  onEdit,
  onConfirmEdit,
  onAuthentication,
}) => {
  return (
    <div className="button-container">
      <Stack direction="row" spacing={1}>
        <Fab className="button" color="primary">
          <EditIcon onClick={onEdit} />
        </Fab>
        {editable && (
          <Fab className="button" color="success">
            <CheckIcon onClick={onConfirmEdit} />
          </Fab>
        )}
      </Stack>
      <Fab className="button">
        <PersonIcon onClick={onAuthentication} />
      </Fab>
    </div>
  );
};

ActionButton.propTypes = {
  editable: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onConfirmEdit: PropTypes.func.isRequired,
  onAuthentication: PropTypes.func.isRequired,
};

export default ActionButton;
