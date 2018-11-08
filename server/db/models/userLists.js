const Sequelize = require('sequelize')
const db = require('../db')

const UserList = db.define('userList', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

module.exports = UserList