const Sequelize = require('sequelize')
const db = require('../db')

const ListItem = db.define('listItems', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

module.exports = ListItem
