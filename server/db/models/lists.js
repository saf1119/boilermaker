const Sequelize = require('sequelize')
const db = require('../db')

const List = db.define('lists', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	weatherSummary: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	place: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports = List
