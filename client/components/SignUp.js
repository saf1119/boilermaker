import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {Form, Button, Card} from 'semantic-ui-react'
import Navbar from './Navbar'

 
class SignUp extends React.Component {
  state = {
    moreButtons: ``,
    buttonCount: 0,
    email: '',
    password: ''
  }

  handleChange = (evt) => {
      this.setState({[evt.target.name]: evt.target.value,
                      name: evt.target.name })
  }

  handleAdd = () => {
    const buttonCount = this.state.buttonCount
    this.setState({ buttonCount: (buttonCount + 1)})
    let newState = <React.Fragment>
                    {this.state.moreButtons}
                    <Form.Field>
                <input name={`quantity${buttonCount + 1}`} type="quantity" onChange={this.handleChange} /> 
              </Form.Field>
              <Form.Field>
                <input name={`item${buttonCount + 1}`} type="item" onChange={this.handleChange} /> 
              </Form.Field>
              <br /></React.Fragment>
    this.setState({moreButtons: newState })
  }
  render() {
  const {name, displayName, handleSubmit, error} = this.props
  return (
    <div className="animated fadeIn">
      <Navbar />
      <div>
        <div className="background ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            <br />
            <br />
            <div className="ui raised fluid card">
            <h1 className="black">Sign Up</h1>
             <Form name={name}>
               <Form.Field>
                 <label htmlFor="email">Email</label>
                 <input name="email" type="text" onChange={this.handleChange}/>
               </Form.Field>
              <br />
              <Form.Field className="form">
                <label htmlFor="password">Password</label>
                <input name="password" type="password" onChange={this.handleChange}/>
              </Form.Field>
              <h3 className="black">Below, enter any items that you'd want to include in every packing list that you make (some examples would be glasses, contacts, a prescription, toiletries)</h3>
              <Form.Field>
                <label htmlFor="quantity">Quantity</label>
                <input name="quantity0" type="quantity" onChange={this.handleChange}/> 
              </Form.Field>
              <Form.Field>
                <label htmlFor="item">Item</label>
                <input name="item0" type="item" onChange={this.handleChange}/> 
              </Form.Field>
              <br />
              {this.state.moreButtons}
              <br />
              <Button color="green" size="small" onClick ={this.handleAdd}>Add Another Item</Button>
              <br />
              <br />
              <Button color="blue" type="submit" size="small" className="form" onClick={() => handleSubmit(this.state)}>
                <h4 className="form">{displayName}</h4>
              </Button>
              {error && error.response && <div> {error.response.data} </div>}
            </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(stateObj) {
      const quantity = []
      const item = []
      for(let i = 0; i <= stateObj.buttonCount; i++) {
        quantity.push(stateObj[`quantity${i}`])
        item.push(stateObj[`item${i}`])
      }
      const formName = 'signup'
      const email = stateObj.email
      const password = stateObj.password
      dispatch(auth(email, password, formName, item, quantity))
    }
  }
}

export default connect(mapSignup, mapDispatch)(SignUp)