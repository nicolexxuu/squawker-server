const db = require("../models");

exports.createMessage = async function (req, res, next) {
    try {
        let message = await db.Message.create({
            text: req.body.text,
            imageUrl: req.body.url,
            user: req.params.id
        });

        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message.id).populate("user", {
            username: true,
            profileImageUrl: true
        });

        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

exports.getMessage = async function (req, res, next) {
    try {
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    } catch (err) {
        return next(err);
    }
};

exports.deleteMessage = async function (req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

exports.editMessage = async function (req, res, next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        foundMessage.text = req.body.text;
        foundMessage.imageUrl = req.body.url;
        await foundMessage.save();
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};


