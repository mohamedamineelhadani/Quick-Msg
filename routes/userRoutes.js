const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/UserController');

router.use(auth);

router.get('/me',UserController.profile);
router.delete('/delete',UserController.delete);
router.put('/update',UserController.update);

module.exports = router;