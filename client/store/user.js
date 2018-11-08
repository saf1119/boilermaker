import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, item, quantity) => async dispatch => {
  let res
  try {
    console.log('here!')
    res = await axios.post(`/auth/${method}`, {email, password})
    console.log('data', res.data)
    if(item && quantity && (method==="signup")) {
      console.log('signup')
      if(item.length) {
        let userItems = await axios.post(`/api/userLists/${res.data.id}`, {item, quantity})
      }
    }
    console.log('end')
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    console.log('here though')
    dispatch(getUser(res.data))
    console.log('here!')
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
