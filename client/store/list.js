import {calculateList, analyzeTemperature} from '../utility'
import axios from 'axios'

const CREATE_LIST = 'CREATE_LIST'
const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM'
const ADD_LIST_ITEM = 'ADD_LIST_ITEM'
const SAVE_LIST = 'SAVE_LIST'
const GET_USER_LISTS = 'GET_USER_LISTS'
const UPDATE_LIST = 'UPDATE_LIST'
const GET_SINGLE_LIST = 'GET_SINGLE_LIST'
const ADD_QUANTITY = 'ADD_QUANTITY'
const SUBTRACT_QUANTITY = 'SUBTRACT_QUANTITY'

export const createListAction = (name, place, summary, data, numDays, otherListItems) => ({
	type: CREATE_LIST,
	name,
	place,
	summary,
	data,
	numDays,
	otherListItems
})

export const deleteListItem = listItem => ({
	type: DELETE_LIST_ITEM,
	listItem
})

export const addListItem = listItem => ({
	type: ADD_LIST_ITEM,
	listItem
})

export const saveList = list => ({
	type: SAVE_LIST,
	list: list
})

const getUserLists = lists => ({
	type: GET_USER_LISTS,
	lists
})

const updateList = updatedList => ({
	type: UPDATE_LIST,
	updatedList
})

const getList = list => ({
	type: GET_SINGLE_LIST,
	list
})

export const addQuantity = listItem => ({
	type: ADD_QUANTITY,
	listItem
})

export const subtractQuantity = listItem => ({
	type: SUBTRACT_QUANTITY,
	listItem
})

//thunks
export const saveListToServer = list => {
	return async dispatch => {
		const newList = await axios.post('/api/lists', list)
		dispatch(saveList(newList.data))
	}
}

export const getUserListsFromServer = userId => {
	return async dispatch => {
		const userLists = await axios.get(`/api/lists/${userId}`)
		dispatch(getUserLists(userLists.data))
	}
}

export const createListFromWeather = (name, place, summary, data, numDays, userId) => {
	return async dispatch => {
		const listItems = await axios.get(`/api/userLists/${userId}`)
		console.log('listItems', listItems)
		dispatch(createListAction(name, place, summary, data, numDays, listItems.data))
	}
}

export const updateListInServer = updateInfo => {
	return async dispatch => {
		const res = await axios.put(
			`/api/lists/update/${updateInfo.listId}`,
			updateInfo
		)
		console.log('res data here', res.data)
		//dispatch(updateList(res.data))
	}
}

export const getSingleListFromServer = id => {
	console.log('id', id)
	return async dispatch => {
		const res = await axios.get(`/api/lists/list/${id}`)
		dispatch(getList(res.data))
	}
}

const defaultList = {
	userLists: [],
	inProgressList: {name: '', place: '', weatherSummary: '', listItems: []}
}
let tempData
let listItems
let inProgressList
let userLists
let listItem
export default function(state = defaultList, action) {
	switch (action.type) {
		case CREATE_LIST:
			tempData = analyzeTemperature(action.data)
			listItems = calculateList(tempData, action.numDays)
			listItems = listItems.concat(action.otherListItems)
			inProgressList = {
				name: action.name,
				place: action.place,
				weatherSummary: action.summary,
				listItems: listItems
			}
			return {
				...state,
				inProgressList: inProgressList
			}
		case DELETE_LIST_ITEM:
			listItems = state.inProgressList.listItems.filter(listItem => {
				return listItem.name !== action.listItem.name
			})
			return {
				...state,
				inProgressList: {...state.inProgressList, listItems: listItems}
			}
		case ADD_LIST_ITEM:
			listItems = state.inProgressList.listItems.concat([action.listItem])
			return {
				...state,
				inProgressList: {...state.inProgressList, listItems: listItems}
			}
		case ADD_QUANTITY:
			listItem = {
				name: action.listItem.name,
				quantity: (parseInt(action.listItem.quantity) + 1)
			}
			listItems = state.inProgressList.listItems.map((singleItem) => {
				return (singleItem.name === listItem.name) ? listItem : singleItem
			})
			return {...state, inProgressList: {...state.inProgressList, listItems: listItems}}
		case SUBTRACT_QUANTITY:
			listItem = {
				name: action.listItem.name,
				quantity: (parseInt(action.listItem.quantity) - 1)
			}
			listItems = state.inProgressList.listItems.map((singleItem) => {
				return (singleItem.name === listItem.name) ? listItem : singleItem
			})
			return {...state, inProgressList: {...state.inProgressList, listItems: listItems}}
		case UPDATE_LIST:
			userLists = state.userLists.map(list => {
				return list.id === action.updatedList.id
					? action.updatedList
					: list
			})
			return {...state, userLists: userLists}
		case SAVE_LIST:
			userLists = state.userLists.concat([action.list])
			return {...state, userLists: userLists}
		case GET_USER_LISTS:
			return {...state, userLists: action.lists}
		case GET_SINGLE_LIST:
			return {...state, inProgressList: action.list}
		default:
			return state
	}
}
