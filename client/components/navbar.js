import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="blue animated fadeIn border">
    <div className="ui one column stackable center aligned page grid">
      <div className="column twelve wide">
        <h3 />
        <h1 className="white">PackIt</h1>
      </div>
    </div>
    <nav>
      {isLoggedIn ? (
        <div className="border ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            {/* The navbar will show these links after you log in */}
            <a href="#" onClick={handleClick}>
              <h3 className="form white-color">Logout</h3>
            </a>
            <Link to="/lists">
              <h3 className="form white-color">My Lists</h3>
            </Link>
            <Link to="/geocoding">
              <h3 className="form white-color">New List</h3>
            </Link>
          </div>
        </div>
      ) : (
        <div className="ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              <h3 className="form white-color right">Login</h3>
            </Link>
            <Link to="/signup">
              <h3 className="form white-color right">Sign Up</h3>
            </Link>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
