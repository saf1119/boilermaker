import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Form, Button, Card, Input} from 'semantic-ui-react'
import Navbar from './Navbar'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="animated fadeIn">
      <Navbar />
      <div>
        <div className="background ui one column stackable center aligned page grid">
          <div className="column seven wide">
            <br />
            <br />
            <div className="max-width">
            <div className="ui raised fluid card">
              <br />
              <h1 className="black">Login</h1>
            <Form onSubmit={handleSubmit} name={name}>
              <Form.Field control={Input} placeholder="Email" name="email" />
              <Form.Field control={Input} placeholder="Password" type="password" name="password" />
              <br />
              <br />
              <Button color="blue" type="submit" size="small" className="form">
                <h4 className="form">{displayName}</h4>
              </Button>
              {error && error.response && <div> {error.response.data} </div>}
            </Form>
                          </div>
            <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
