const User = require('../models/user');

let username_checker = async (req, res, next) => {
    try {
        let { user_name } = req.body
        let username_exists = await User.findOne({ user_name : user_name });
        if(username_exists){
            let message = {
                type: 0,
                message: res.status(200).send('Username already taken!')
            }
        }
        else {
            next()
        }
    } catch(err) {
        res.status(500).send(err)
    }

}

module.exports = username_checker;