import React from 'react'
import {connect} from 'react-redux'
import {Button, Checkbox, Form} from 'semantic-ui-react'
import {getUserListsFromServer} from '../store/list'
import {NavLink} from 'react-router-dom'
import Navbar from './Navbar'

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
				<div className="background">
					<Navbar />
					<br />
					<br />
				<div className="ui stackable center aligned page grid">
					<div className="sizing ui white card">
					<br />
					<div className="column">
						<div className="ui center aligned grid">
						<h2 className="sargasso underline">My Lists</h2>
						<h3 />
						</div>
						<div className="padding">
						{this.props.userLists.map(userList => {
							return (
								<div key={userList.id}>
									<NavLink to={`/lists/${userList.id}`}>
										<h3 className="sargasso">
											{userList.title}
										</h3>
									</NavLink>
									<br />
								</div>
							)
						})}
						</div>
					</div>
				</div>
				</div>
				</div>
			)
		} else
			return (
				<div className="background">
					<Navbar />
				<div className="ui stackable center aligned page grid">
					<h1 />
					<h1 />
					<div className="card-sizing ui white card">
					<div className="column">
						<div className="ui center aligned grid">
						<h3 />
						<h3 className="sargasso">
							You currently have no lists. Click the link above to
							create a new one!
						</h3>
					</div>
				</div>
				</div>
				</div>
				</div>
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllLists)
