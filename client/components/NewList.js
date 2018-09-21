import React from 'react'
import {connect} from 'react-redux'
import {deleteListItem, addListItem, saveListToServer} from '../store/list'
import SingleList from './SingleList'

const mapStateToProps = state => ({
	list: state.list.inProgressList,
	user: state.user,
	lists: state.list.userLists
})

const mapDispatchToProps = dispatch => ({
	deleteListItem: listItem => {
		dispatch(deleteListItem(listItem))
	},
	addListItem: listItem => {
		dispatch(addListItem(listItem))
	},
	saveList: list => {
		dispatch(saveListToServer(list))
	}
})
class NewList extends React.Component {
	state = {
		name: '',
		quantity: '',
		isSaved: false
	}
	handleDelete = listItem => {
		this.props.deleteListItem(listItem)
	}
	handleChange = event => {
		this.setState({[event.target.name]: event.target.value})
	}
	handleAdd = () => {
		const newItem = this.state
		this.props.addListItem(newItem)
		this.setState({
			name: '',
			quantity: ''
		})
	}
	saveList = async () => {
		const userId = this.props.user.id
		const list = this.props.list
		const listToSave = {
			userId: userId,
			title: list.name,
			place: list.place,
			listItems: list.listItems,
			summary: list.weatherSummary
		}
		await this.props.saveList(listToSave)
		this.setState({isSaved: true})
	}
	render() {
		if (!this.state.isSaved) {
			return (
				<SingleList
					handleChange={this.handleChange}
					handleAdd={this.handleAdd}
					handleDelete={this.handleDelete}
					list={this.props.list}
					isSaved={this.state.isSaved}
					saveList={this.saveList}
				/>
			)
		} else {
			return (
				<div className="ui two column stackable center aligned page grid">
					<div className="column twelve wide">
						<h3 className="sargasso">List saved!</h3>
						<h4 className="sargasso">
							To view all of your lists, click on the hyperlink
							above
						</h4>
					</div>
				</div>
			)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewList)
