import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import AuthenticationForm from "./components/AuthenticationForm";
import Editor from "./components/Editor";
import ActionButton from "./components/ActionButton";
import UserList from "./components/UserList";
import Button from "@mui/material/Button";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [value, setValue] = useState("");
  let [username, setUsername] = useState("");
  let [showForm, setShowForm] = useState(false);
  let [editable, setEditable] = useState(false);
  let [users, setUsers] = useState([]);
  let cursor;

  useEffect(() => {
    socket.on("receive-value", (data) => {
      setValue(data);
    });

    socket.on("receive-users", (data) => {
      setUsers(data);
    });

    socket.on("authenticated", (authenticate, username) => {
      if (authenticate) {
        setUsername(username);
        setShowForm(false);
        setEditable(true);
      }
    });

    socket.on("start-edit", (data) => {
      setEditable(data);
      const editor = document.querySelector(".ql-editor");
      editor.contentEditable = editable;
    });

    socket.on("confirm-edit", (data) => {
      setEditable(data);
      const editor = document.querySelector(".ql-editor");
      editor.contentEditable = editable;
    });
  });

  setTimeout(() => {
    const editor = document.querySelector(".ql-editor");
    editor.contentEditable = editable;
  }, 1000);

  setTimeout(() => {
    cursor = document.querySelector(".cursor");
  }, 3000);

  const handleEdit = () => {
    if (username.length > 0) {
      socket.emit("user-start-edit", username);
    }
  };

  const handleConfirmEdit = () => {
    socket.emit("send-value", value);
    socket.emit("user-confirm-edit", username);
  };

  const handleRegister = (username, password) => {
    const isNamePresent = users.some((user) => user.name === username);

    if (!isNamePresent) {
      setUsername(username);
      setShowForm(false);
      socket.emit("register-users", username, password);
    } else if (isNamePresent) {
      alert("Username already present choose another username");
    }
  };

  const handleLogin = (username, password) => {
    socket.emit("login-users", username, password);
  };

  const handleAuthentication = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  document.addEventListener("mousemove", (event) => {
    cursor.style.left = event.pageX + "px";
    cursor.style.top = event.pageY + "px";
  });

  return (
    <>
      <div className="cursor">
        {username.length !== 0 && (
          <Button className="username" color="primary" variant="contained">
            {username}
          </Button>
        )}
      </div>
      {showForm && (
        <AuthenticationForm
          onLogin={handleLogin}
          onRegister={handleRegister}
          onCloseForm={handleCloseForm}
        />
      )}
      <Editor value={value} setValue={setValue} />
      <div className="right">
        <ActionButton
          editable={editable}
          onEdit={handleEdit}
          onConfirmEdit={handleConfirmEdit}
          onAuthentication={handleAuthentication}
        />
        <UserList users={users} individual={username} />
      </div>
    </>
  );
};

export default App;
