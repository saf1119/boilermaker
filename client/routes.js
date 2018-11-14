import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {SplashPage, Login, SignUp, UserHome, UserProfile, EditProfile} from './components'
import {me} from './store'
import Geocoding from './components/Geocoding'
import NewList from './components/NewList'
import AllLists from './components/AllLists'
import EditList from './components/EditList'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={SplashPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/geocoding" component={Geocoding} />
            <Route exact path="/newList" component={NewList} />
            <Route path="/editUser/:userId" component={EditProfile} />
            <Route path="/lists/:listId" component={EditList} />
            <Route path="/lists" component={AllLists} />
            <Route path="/home" component={UserHome} />
            <Route path="/profile" component={UserProfile} />
            <Route component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
