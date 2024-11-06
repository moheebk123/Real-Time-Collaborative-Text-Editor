import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { mongoose } from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const textEditor = new mongoose.Schema({
  value: String,
});

const TextEditor = new mongoose.model("TextEditor", textEditor);

const userStatus = new mongoose.Schema({
  name: String,
  status: String,
});

const UserStatus = new mongoose.model("UserStatus", userStatus);

const userCredential = new mongoose.Schema({
  name: String,
  password: String,
});

const UserCredential = new mongoose.model("UserCredential", userCredential);

const getUsers = async () => {
  const users = await UserStatus.find();
  const userList = users.map((user) => {
    return { name: user.name, status: user.status };
  });
  io.emit("receive-users", userList);
};

const getValue = async () => {
  const oldValue = await TextEditor.findOne();
  const value = oldValue.value;
  io.emit("receive-value",  value);
};

const handleRegister = async (username, password) => {
  UserStatus.create({
    name: username,
    status: "unactive",
  });
  UserCredential.create({
    name: username,
    password: password,
  });
  const users = await UserStatus.find();
  const userList = users.map((user) => {
    return { name: user.name, status: user.status };
  });
  io.emit("receive-users", userList);
};

const handleLogin = async (username, password) => {
  const user = await UserCredential.findOne({
    name: username,
    password: password,
  });

  if (user !== null) {
    const loggedUser = await UserStatus.updateOne(
      { name: username },
      { $set: { status: "active" } }
    );
    const users = await UserStatus.find();
    const userList = users.map((user) => {
      return { name: user.name, status: user.status };
    });
    io.emit("receive-users", userList);
    return true;
  } else {
    return false;
  }
};

const handleEdit = async (username) => {
  const loggedUser = await UserStatus.updateOne(
    { name: username },
    { $set: { status: "active" } }
  );
  const users = await UserStatus.find();
  const userList = users.map((user) => {
    return { name: user.name, status: user.status };
  });
  io.emit("receive-users", userList);
};

const handleConfirmEdit = async (username) => {
  const loggedUser = await UserStatus.updateOne(
    { name: username },
    { $set: { status: "unactive" } }
  );
  const users = await UserStatus.find();
  const userList = users.map((user) => {
    return { name: user.name, status: user.status };
  });
  io.emit("receive-users", userList);
};

const handleValue = async (value) => {
  const newValue = await TextEditor.updateOne({}, { $set: { value: value } });
  const updatedValue = await TextEditor.findOne();
  const editorValue = updatedValue.value;
  io.emit("receive-value", editorValue);
};

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  getUsers();
  getValue();

  socket.on("user-start-edit", (username) => {
    handleEdit(username);
    socket.emit("start-edit", true);
  });

  socket.on("user-confirm-edit", (username) => {
    handleConfirmEdit(username);
    socket.emit("confirm-edit", false);
  });

  socket.on("send-value", (data) => {
    handleValue(data);
  });

  socket.on("register-users", (username, password) => {
    handleRegister(username, password);
  });

  socket.on("login-users", async (username, password) => {
    const authenticate = await handleLogin(username, password);
    socket.emit("authenticated", authenticate, username);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
