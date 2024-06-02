const Chat = require('../models/Chat');

const createChat = async (req, res) => {
    const { participants } = req.body;

    try {
        const chat = new Chat({ participants });
        await chat.save();
        res.status(200).json(chat);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.user.id }).populate('participants', 'username email');
        res.status(200).json(chats);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const sendMessage = async (req, res) => {
    const { chatId, message } = req.body;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(400).send('Chat not found');
        }

        chat.messages.push({ sender: req.user.id, content: message });
        await chat.save();

        res.status(200).json(chat);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { createChat, getChats, sendMessage };
