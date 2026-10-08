const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MessageController = require('../controllers/MessageController');

router.use(auth);

router.get('/inbox',MessageController.inbox);
router.get('/sent',MessageController.sent);
router.post('/',MessageController.compose);
router.patch('/:id/read',MessageController.read);
router.delete('/:id',MessageController.delete);

module.exports = router;