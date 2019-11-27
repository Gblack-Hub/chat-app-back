"use strict"
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const jwtkey = "mychatappkey"

const g_response = {
	error: null,
	message: null,
	data: null,
	token: null
}

let users = {
	signUp: async (req, res) => {
		let response = g_response;
		try {
			let { user_name, email, password, phone_number } = req.body;
			let userData = new User ({
				user_name: user_name,
				email: email,
				password: password,
				phone_number: phone_number,
			});
			const result = await userData.save();
			response = {
				error: false,
				message: true,
				data: 'User Created'
			}
			res.status(201).send(response)
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},

	login: async (req, res) => {
		let response = g_response;
		try {
			let { user_name, password } = req.body;
			const user = await User.findByDetails(user_name, password)
			if(!user){
				res.status(401).send({ error: "Failed to login, please check your login details" })
			}
			const token = jwt.sign({ _id: user._id }, jwtkey)
			response = {
				error: false,
				message: true,
				data: { user_name: user.user_name, phone_number: user.phone_number },
				token: token
			}
			res.status(200).send(response)
		} catch(err) {
			res.status(500).send(err);
		}
	},
	readUsers: async (req, res) => {
		let response = g_response;
		try {
			const result = await User.find().exec();
			response = {
				error: false,
				message: true,
				data: result
			}
			res.status(200).send(response);
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},
	readOneUser: async (req, res) => {
		let response = g_response;
		try {
			console.log(req.params.id)
			// if(typeof req.header('Authorization') !== undefined){  //check if bearer is undefined
			// 	const token = req.header('Authorization').replace('Bearer ', '')
			// 	const user = jwt.verify(token, process.env.JWT_KEY)
				// const result = await User.findById(user._id).exec()
				// response = {
				// 	error: false,
				// 	message: true,
				// 	data: result
				// }
				res.status(200).send(result)
			// } else {
				// response.sendStatus(403); //forbidden
			// }
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},
	updateUser: async (req, res) => {
		let response = g_response;
		try {
			const result = await User.findById(req.params.id).exec();
			response = {
				error: false,
				message: true,
				data: result
			}
			res.status(200).send(response)
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	},
	deleteUser: async (req, res) => {
		let response = g_response;
		try {
			let { user_id } = req.params;
			// const result = await User.findById(req.params.id).exec();
			await Users.deleteOne({ _id: ObjectId(user_id) })
			// res.redirect('/?m=deleted')
			response = {
				error: false,
				message: true,
				data: 'deleted'
			}
			res.status(200).send(response)
		} catch(err) {
			response.error = true;
			res.status(500).send(err);
		}
	}
}

module.exports = users;