import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Navbar from './Navbar'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="animated fadeIn background-home">
      <Navbar />
      <div className="animated fadeIn">
        <div className="ui two column stackable center aligned page grid">
          <div className="column thirty wide">
            <br />
            <br />
            <br />
            <h1 className="whiteColor form">Welcome, {email}</h1>
            <h2 className="whiteColor form">
              Planning your next trip is just a few clicks away!
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
