const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post("/register",AuthController.register);
router.get("/active/:email/:id",AuthController.active)
router.post("/login",AuthController.login);


module.exports = router;
