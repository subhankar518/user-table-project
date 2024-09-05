const express = require("express");
const router = express.Router();

const { createUser, deleteUsers, getAllUsers  } = require("../controllers/userController");

console.log("in1")

router.post("/createUser", createUser);
// router.post("/updateUser", updateUser);
router.delete("/deleteUsers", deleteUsers);
router.get("/getAllUsers",getAllUsers)

module.exports = router;
