import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Navbar from './Navbar'
import {Card} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="animated fadeIn background">
      <Navbar />
      <div className="animated fadeIn">
            <h1 className="form bottom-padded">Welcome, {email}</h1>
            <h2 className="form bottom">
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
