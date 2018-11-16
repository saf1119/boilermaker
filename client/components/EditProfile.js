import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {Form, Button, Icon} from 'semantic-ui-react'
import Navbar from './Navbar'
import {getUserListsFromServer, handleDelete, updateUserItems} from '../store/userListItems'


 
class EditProfile extends React.Component {
  state = {
    moreButtons: ``,
    buttonCount: 0,
    email: '',
    password: ''
  }

  handleChange = (evt) => {
      this.setState({[evt.target.name]: evt.target.value,
                      name: evt.target.name })
      console.log('state', this.state)
  }

  handleAdd = () => {
    const buttonCount = this.state.buttonCount
    this.setState({ buttonCount: (buttonCount + 1)})
    let newState = <React.Fragment>
    {this.state.moreButtons}
                    <Form.Field>
                <input placeholder="quantity" name={`quantity${this.state.buttonCount + 1}`} type="quantity" onChange={this.handleChange} /> 
              </Form.Field>
              <Form.Field>
                <input placeholder="item" name={`item${this.state.buttonCount + 1}`} type="item" onChange={this.handleChange} /> 
              </Form.Field>
              <br />
              <br /></React.Fragment>
    this.setState({moreButtons: newState })
  }
  componentDidMount() {
    const userId = this.props.user.id
    this.props.getUserListsFromServer(userId)
  }
  render() {
  const {name, error} = this.props
      const userId = this.props.user.id
    return (
    <div className="animated fadeIn">
      <Navbar />
      <div>
        <div className="background ui one column stackable center aligned page grid">
          <div className="column twelve wide">
            <br />
            <br />
            <div className="ui raised fluid card">
            <h1 className="sargasso form">Edit my profile</h1>
             <Form name={name}>
              <h3 className="black" className="sargasso form">List of items to include in every packing list:</h3>
              <h4 className="black" className="sargasso form">Items currently included:</h4>
              {this.props.userListItems.map((userListItem) => {
                return (
                  <React.Fragment>
                  <div>
                  <h4 className="sargasso form">{userListItem.quantity} {userListItem.name} <Button onClick={()=>this.props.handleDelete(userListItem.id)} size="mini" color="red">Delete</Button></h4>
                  </div>
                  <br />
                  </React.Fragment>
                )
              })}
              <Form.Field>
                <input placeholder="quantity" name="quantity0" type="quantity" onChange={this.handleChange}/> 
              </Form.Field>
              <Form.Field>
                <input placeholder="item" name="item0" type="item" onChange={this.handleChange}/> 
              </Form.Field>
              <br />
              {this.state.moreButtons}
              <br />
              <Button color="green" size="small" onClick ={this.handleAdd}>Add Another Item</Button>
              <br />
              <br />
              <Button onClick={() => this.props.handleSubmit(userId, this.state)} color="blue" type="submit" size="small" className="form">
                <h4 className="form">Update User Info</h4>
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
    user: state.user,
   	userListItems: state.userListItems,
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    getUserListsFromServer: (userId) => dispatch(getUserListsFromServer(userId)),
    handleDelete: (userListId) => dispatch(handleDelete(userListId)),
    handleSubmit: (userId, stateObj) => {
      const quantity = []
      const item = []
      for(let i = 0; i <= stateObj.buttonCount; i++) {
        quantity.push(stateObj[`quantity${i}`])
        item.push(stateObj[`item${i}`])
      }
      dispatch(updateUserItems(userId, item, quantity))
    }
  }
}

export default connect(mapSignup, mapDispatch)(EditProfile)