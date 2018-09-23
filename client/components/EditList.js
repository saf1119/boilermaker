import React from 'react'
import {connect} from 'react-redux'
import SingleList from './SingleList'
import {
	addQuantity,
	deleteListItem,
	addListItem,
	updateListInServer,
	getSingleListFromServer,
	subtractQuantity
} from '../store/list'

import Navbar from './Navbar'

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
	},
	addQuantity: listItem => {
		dispatch(addQuantity(listItem))
	},
	subtractQuantity: listItem => {
		dispatch(subtractQuantity(listItem))
	}
})

class EditList extends React.Component {
	state = {
		name: '',
		quantity: '',
		validation: ''
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
		console.log('state',newItem)
		if(this.state.name && (parseInt(this.state.quantity) > 0)) {
		this.props.addListItem(newItem)
		this.setState({
			name: '',
			quantity: '',
			fade: 'fadeInLeft',
			validation: ''
		})
	} else {
		this.setState({ validation: 'Invalid input'})
	}
	}
	handleAddQuantity = listItem => {
		this.props.addQuantity(listItem)
	}
	handleSubtractQuantity = listItem => {
		this.props.subtractQuantity(listItem)
	}
	saveEditedList = async () => {
		const list = this.props.list
		const listId = this.props.match.params.listId
		const listToSave = {
			listId: listId,
			listItems: list.listItems
		}
		await this.props.updateList(listToSave)
		this.props.history.push('/lists')
	}
	render() {
		if (this.props.list) {
			return (
				<div className="background-fixed">
					<Navbar />
					<h1 />
					<SingleList
						handleChange={this.handleChange}
						handleAddQuantity={this.handleAddQuantity}
						handleSubtractQuantity={this.handleSubtractQuantity}
						handleAdd={this.handleAdd}
						handleDelete={this.handleDelete}
						list={this.props.list}
						saveList={this.saveEditedList}
						validation={this.state.validation}
					/>
				</div>
			)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditList)
