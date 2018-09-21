import React from 'react'
import {connect} from 'react-redux'
import {Button, Checkbox, Form} from 'semantic-ui-react'
import {getUserListsFromServer} from '../store/list'
import {NavLink} from 'react-router-dom'

const mapDispatchToProps = dispatch => ({
	getLists: id => dispatch(getUserListsFromServer(id))
})

const mapStateToProps = state => ({
	user: state.user,
	userLists: state.list.userLists
})
class AllLists extends React.Component {
	componentDidMount() {
		const userId = this.props.user.id
		this.props.getLists(userId)
	}
	render() {
		if (this.props.userLists.length) {
			return (
				<div className="ui two column stackable center aligned page grid">
					<div className="column thirty wide">
						<h2 className="black">My Lists</h2>
						{this.props.userLists.map(userList => {
							return (
								<div key={userList.id}>
									<NavLink to={`/lists/${userList.id}`}>
										<h3 className="blue-links">{userList.title}</h3>
									</NavLink>
									<br />
								</div>
							)
						})}
					</div>
				</div>
			)
		} else
			return (
				<div className="ui two column stackable center aligned page grid">
					<div className="column thirty wide">
						<h3 />
						<h3 className="sargasso">
							You currently have no lists. Click the link above to
							create a new one!
						</h3>
					</div>
				</div>
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllLists)
