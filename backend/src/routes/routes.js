const express = require("express");
const router = express.Router();

const { getUser, createUser, deleteUsers, updateUser,getAllUsers  } = require("../controllers/userController");

console.log("in1")

router.post("/createUser", createUser);
router.get("/getUser", getUser);
router.post("/updateUser", updateUser);
router.delete("/deleteUsers", deleteUsers);
router.get("/getAllUsers",getAllUsers)

module.exports = router;
