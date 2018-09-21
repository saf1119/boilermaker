import React from 'react'
import {connect} from 'react-redux'
import SingleList from './SingleList'
import {
	deleteListItem,
	addListItem,
	updateListInServer,
	getSingleListFromServer
} from '../store/list'

const mapStateToProps = state => ({
	list: state.list.inProgressList
})

const mapDispatchToProps = dispatch => ({
	deleteListItem: listItem => {
		dispatch(deleteListItem(listItem))
	},
	addListItem: listItem => {
		dispatch(addListItem(listItem))
	},
	updateList: list => {
		dispatch(updateListInServer(list))
	},
	getSingleList: id => {
		dispatch(getSingleListFromServer(id))
	}
})

class EditList extends React.Component {
	state = {
		name: '',
		quantity: '',
		isSaved: false
	}
	componentDidMount() {
		const listId = this.props.match.params.listId
		console.log('id', listId)
		this.props.getSingleList(listId)
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
	saveEditedList = async () => {
		const list = this.props.list
		const listId = this.props.match.params.id
		const listToSave = {
			listId: listId,
			listItems: list.listItems
		}
		await this.props.updateList(listToSave)
		this.setState({isSaved: true})
	}
	render() {
		if (this.props.list) {
			return (
				<SingleList
					handleChange={this.handleChange}
					handleAdd={this.handleAdd}
					handleDelete={this.handleDelete}
					list={this.props.list}
					isSaved={this.state.isSaved}
					saveList={this.saveEditedList}
				/>
			)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditList)
