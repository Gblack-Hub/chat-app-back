"use strict"

const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
	"username": String,
	"message": String,
	"created": Date
})

module.exports = mongoose.model('message', MessageSchema);