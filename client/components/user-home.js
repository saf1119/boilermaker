import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="ui two column stackable center aligned page grid">
      <div className="column thirty wide">
        <br />
        <h1 className="sargasso form">Welcome, {email}</h1>
        <h2 className="sargasso form">
          Planning your next trip is just a few clicks away!
        </h2>
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
