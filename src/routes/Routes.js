const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();


router.get("/usuarios", UserController.GetUser);
router.get("/usuarios/:id", UserController.GetUserId);
router.post("/register", UserController.RegisterUser);
router.post("/login", UserController.LoginUser);
router.put("/update/:id", UserController.UpdateUser);
router.delete("/delete/:id", UserController.DeleteUser);



module.exports = router;