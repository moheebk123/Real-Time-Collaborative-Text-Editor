import { useState } from "react";
import PropTypes from "prop-types";
import CancelIcon from "@mui/icons-material/Cancel";

const AuthenticationForm = ({ onLogin, onRegister, onCloseForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    if (username.length > 0 && password.length > 0) {
      e.preventDefault();
      onLogin(username, password);
      setUsername("");
      setPassword("");
    }
  };

  const handleRegister = (e) => {
    if (username.length > 0 && password.length > 0) {
      e.preventDefault();
      onRegister(username, password);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form className="authentication-form">
    <CancelIcon color="error" fontSize="large" className="close-button" onClick={onCloseForm} />
      <input
        type="text"
        placeholder="Enter your Name..."
        spellCheck="false"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your Password..."
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </div>
    </form>
  );
};

AuthenticationForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
};

export default AuthenticationForm;
