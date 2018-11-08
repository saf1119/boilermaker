const User = require('./user')
const List = require('./lists')
const ListItem = require('./listItems')
const UserList = require('./userLists')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

List.belongsTo(User)
User.hasMany(List)

ListItem.belongsTo(List)
List.hasMany(ListItem)

ListItem.belongsTo(User)
User.hasMany(ListItem)

UserList.belongsTo(User)
User.hasMany(UserList)

module.exports = {
	User,
	List,
	ListItem,
	UserList
}
