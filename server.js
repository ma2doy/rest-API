const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");

const app = express();

app.use(express.json());

const User = require("./models/User");

connectDB();

/******************************** START CRUD   ****************/
// add a new user
app.post("/add_users", async (req, res) => {
  const { name, lastName, email, phone } = req.body;
  const newUser = new User({ name, email, lastName, phone });
  try {
    let user = await newUser.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// get all users
app.get("/get_users", async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

// get a user by his/her id

app.get("/get_users/:userID", async (req, res) => {
  try {
    let user = await User.findById(req.params.userID);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

//delete a user by his id
app.delete("/delete_user/:userID", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userID);
    res.send({ message: "user deleted successfully" });
  } catch (error) {
    res.send(error);
  }
});
// edit a user by his id
app.put("/edit_user/:userID", async (req, res) => {
  try {
    let editedUser = await User.findByIdAndUpdate(
      req.params.userID,
      { ...req.body },
      { new: true }
    );
    res.send(editedUser);
  } catch (error) {
    res.send(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port  ${PORT}... `));
