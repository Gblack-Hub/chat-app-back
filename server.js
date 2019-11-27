"use strict"

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const bodyParser = require('body-parser')
const usersRoute = require('./routes/users');
const Message = require('./models/message')
const User = require('./models/user')
const port = process.env.PORT || 9000

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/client', express.static(__dirname + '/client'));

//connect to the database
require("./config/db_con");

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/client/views/index.html');
	// res.status(200).send({ message: "Chat App with Vuejs, Nodejs and MongoDB"});
});
//public route
app.use('/user', usersRoute);


const server = app.listen(port, (err) => {
	if (err) console.log(`ERROR: ${ err }`)
	else console.log(`Server listening on port ${ port }`)
})

// setting up socket.io
let io = socket(server);

io.on('connection', (socket) => {
	socket.broadcast.emit(`One user joined the chat with ID: ${ socket.id }`)
	socket.on("message", async (data) => {
		let newMessage = {
			created: new Date(),
			message: data.message,
			username: data.username
		}
		let response = await new Message(newMessage).save();
		io.emit("message", data);
	});
	// socket.on('isTyping', (data) => {
	// 	io.broadcast.emit('typing', data);
	// })
	socket.on("disconnect", () => {
		let data = "One user left";
		socket.broadcast.emit("userLeft", data);
		// users.splice(users.indexOf(socket), 1);
	});
})

app.get('/chat', async (req, res) => {
	let result = await Message.find()
	res.send(result)
})
