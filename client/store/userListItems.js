import axios from 'axios'

const GET_USER_LISTS = 'GET_USER_LISTS'
const DELETE_USER_LIST = 'DELETE_USER_LIST'
const UPDATE_USER_LIST = 'UPDATE_USER_LIST'


const getUserLists = (userLists) => ({type: GET_USER_LISTS, userLists})

const handleDeleteUserListItem = (userListId) => ({type: DELETE_USER_LIST, userListId})

const handleUpdate = (userItems) => ({ type: UPDATE_USER_LIST, userItems})

export const getUserListsFromServer = (userId) => {
	return async dispatch => {
		const userLists = await axios.get(`/api/userLists/${userId}`)
		dispatch(getUserLists(userLists.data))
	}
}

export const updateUserItems = (userId, item, quantity) => {
	return async dispatch => {
		console.log('here', userId, item, quantity)
        let userItems = await axios.post(`/api/userLists/${userId}`, {item, quantity})
 		dispatch(handleUpdate(userItems.data))
	}
}

export const handleDelete = (userListId) => {
	return async dispatch => {
		const userListDelete = await axios.delete(`/api/userLists/${userListId}`)
		console.log('info here', userListDelete)
		dispatch(handleDeleteUserListItem(userListId))
	}
}

export default function(state = [], action) {
	switch (action.type) {
		case GET_USER_LISTS:
			return [...action.userLists]
		case DELETE_USER_LIST:
			return state.filter((userListItem) => {
				return (userListItem.id !== action.userListId)
			})
		case UPDATE_USER_LIST:
			return action.userItems
		default:
			return state
	}
}