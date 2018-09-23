import React from 'react'
import {connect} from 'react-redux'
import {deleteListItem, addListItem, saveListToServer, addQuantity, subtractQuantity} from '../store/list'
import SingleList from './SingleList'
import Navbar from './Navbar'

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
	},
	addQuantity: listItem => {
		dispatch(addQuantity(listItem))
	},
	subtractQuantity: listItem => {
		dispatch(subtractQuantity(listItem))
	}
})
class NewList extends React.Component {
	state = {
		name: '',
		quantity: '',
		isSaved: false,
		validation: ''
	}
	handleDelete = listItem => {
		this.props.deleteListItem(listItem)
	}
	handleChange = event => {
		this.setState({[event.target.name]: event.target.value})
	}
	handleAdd = () => {
		const newItem = this.state
		if(this.state.name && parseInt(this.state.quantity) > 0) {
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
				<div className={`animated {this.state.fade} background-fixed`}>
					<Navbar />
					<h1 />
					<SingleList
						className={`animated {this.state.fade}`}
						handleChange={this.handleChange}
						handleAdd={this.handleAdd}
						handleDelete={this.handleDelete}
						handleAddQuantity={this.handleAddQuantity}
						handleSubtractQuantity={this.handleSubtractQuantity}
						list={this.props.list}
						isSaved={this.state.isSaved}
						saveList={this.saveList}
						validation={this.state.validation}
					/>
				</div>
			)
		} else {
			return (
				<div className={`animated {this.state.fade} background`}>
				<Navbar />

				<div className="ui two column stackable center aligned page grid">
										<h1 />
						<h1 />
					<div className="ui white card">

					<div className="column twelve wide">

						<h3 className="sargasso">List saved!</h3>
						<h4 className="sargasso">
							To view all of your lists, click on the hyperlink
							above
						</h4>
						</div>
					</div>
				</div>
				</div>
			)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewList)
