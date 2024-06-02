const express = require('express');
const { createChat, getChats, sendMessage } = require('../controllers/chatController');
const router = express.Router();

router.post('/create', createChat);
router.get('/', getChats);
router.post('/send', sendMessage);

module.exports = router;
