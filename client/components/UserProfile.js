import React from 'react'
import {connect} from 'react-redux'
import {Card, Image, Grid, Button, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import NavBar from './NavBar'
import {getUserListsFromServer} from '../store/userListItems'

const mapStateToProps = state => ({
	user: state.user,
	userListItems: state.userListItems
})

const mapDispatch = dispatch => ({
	getUserListItems: (userId) => dispatch(getUserListsFromServer(userId))
})
class UserProfile extends React.Component {
	componentDidMount() {
		const userId = this.props.user.id
		this.props.getUserListItems(userId)
	}
	render() {
		const {user, userListItems} = this.props
			return (
				<div>
				<NavBar />
				<h1 />
				<h1 />
				<div className="background">
				<Grid centered width={7}>
				<div className="max-width">
				<Card fluid>
					<Label fluid size="massive"><h1 className="font-header">User profile</h1></Label>
					<Grid.Row>
					<Grid.Column width={1}>
					<img className="max-size" src="profile.png" />
					</Grid.Column>
					<Grid.Column width={1}>
							<h4 >Email: {user.email}</h4>
							<h4>List of personal items: </h4>
							{userListItems.map((userListItem) => {
								return (
									<div key={userListItem.id}>
										<h4>{`${userListItem.quantity} ${userListItem.name}`}</h4>
									</div>
								)
							})}
					</Grid.Column>
					</Grid.Row>
					<h1 />
					<Link className="white" to={`/editUser/${user.id}`}><Button fluid size="small">Edit User Info</Button></Link>
				</Card>
				</div>
				</Grid>
				</div>
				</div>
			)
	}
}

export default connect(mapStateToProps, mapDispatch)(UserProfile)