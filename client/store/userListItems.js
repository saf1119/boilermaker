import axios from 'axios'

const GET_USER_LISTS = 'GET_USER_LISTS'


const getUserLists = (userLists) => ({type: GET_USER_LISTS, userLists})

export const getUserListsFromServer = (userId) => {
	return async dispatch => {
		const userLists = await axios.get(`/api/userLists/${userId}`)
		dispatch(getUserLists(userLists.data))
	}
}

export default function(state = [], action) {
	switch (action.type) {
		case GET_USER_LISTS:
			return [...action.userLists]
		default:
			return state
	}
}