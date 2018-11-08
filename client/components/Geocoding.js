import React from 'react'
const {key, mapsKey} = require('../../secrets')
import axios from 'axios'
import {createListFromWeather} from '../store/list'
import {connect} from 'react-redux'
import {Button, Checkbox, Form} from 'semantic-ui-react'
import NavBar from './NavBar'

const mapDispatchToProps = dispatch => ({
	createList: (name, place, summary, data, numDays, userId) =>
		dispatch(createListFromWeather(name, place, summary, data, numDays, userId))
})

const mapStateToProps = state => ({
	list: state.list.inProgressList,
	user: state.user
})

class Geocoding extends React.Component {
	state = {
		city: '',
		state: '',
		name: '',
		numDays: '',
		fade: 'fadeIn',
		validation: ''
	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value})
	}
	handleSubmit = async event => {
		event.preventDefault()
		if(parseInt(this.state.numDays) > 1 && this.state.city && this.state.state && this.state.state) {
			const address = `${this.state.city} ${this.state.state}`
			const {data} = await axios.get(`/api/weather/${address}`)
			this.setState({
			fade: 'fadeOutLeft'
		})
			const summary = data.summary
			const weatherData = data.data
			const numDays = this.state.numDays
			const name = this.state.name
			const userId = this.props.user.id
			await this.props.createList(
				name,
				address,
				summary,
				weatherData,
				numDays,
				userId
			)
			this.props.history.push('/newList')
	} else {
		this.setState({ validation: 'Required field missing'})
	}
	}
	render() {
		console.log('props', this.props)
		return (
			<div className={`animated ${this.state.fade} background`}>
				<NavBar />
				<h1 />
				<h1 />
				<div className="ui one column stackable center aligned page grid">
					<div className="ui white card">
						<div className="ui one column thirty wide stackable center aligned page grid">
							<div className="column twenty wide">
								<br />
								<h3 className="black">Where are you going?</h3>
								<Form onSubmit={this.handleSubmit}>
									<Form.Field>
										<label className="sargasso">
											List name
										</label>
										<input
											placeholder="Name"
											type="text"
											name="name"
											onChange={this.handleChange}
										/>
									</Form.Field>
									<br />
									<Form.Field>
										<label className="sargasso">
											Number of days
										</label>
										<input
											placeholder="Number of days"
											type="text"
											name="numDays"
											onChange={this.handleChange}
										/>
									</Form.Field>
									<br />
									<Form.Field>
										<label className="sargasso">City</label>
										<input
											placeholder="City"
											type="text"
											name="city"
											onChange={this.handleChange}
										/>
									</Form.Field>
									<br />
									<Form.Field>
										<label className="sargasso">
											State
										</label>
										<input
											placeholder="State"
											type="text"
											name="state"
											onChange={this.handleChange}
										/>
									</Form.Field>
									<br />
									<button
										type="submit"
										className="ui basic black button"
									>
										<h4 className="fadeIn">Submit</h4>
									</button>
										<h4 className="red">{this.state.validation}</h4>

								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Geocoding)
