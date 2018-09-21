import React from 'react'
const {key, mapsKey} = require('../../secrets')
import axios from 'axios'
import {createListFromWeather} from '../store/list'
import {connect} from 'react-redux'
import {Button, Checkbox, Form} from 'semantic-ui-react'

const mapDispatchToProps = dispatch => ({
	createList: (name, place, summary, data, numDays) =>
		dispatch(createListFromWeather(name, place, summary, data, numDays))
})

const mapStateToProps = state => ({
	list: state.list.inProgressList
})

class Geocoding extends React.Component {
	state = {
		city: '',
		state: '',
		name: '',
		numDays: ''
	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value})
	}
	handleSubmit = async event => {
		event.preventDefault()
		const address = `${this.state.city} ${this.state.state}`
		const {data} = await axios.get(`/api/weather/${address}`)
		const summary = data.summary
		const weatherData = data.data
		const numDays = this.state.numDays
		const name = this.state.name
		await this.props.createList(
			name,
			address,
			summary,
			weatherData,
			numDays
		)
		this.props.history.push('/newList')
	}
	render() {
		return (
			<div className="ui one column stackable center aligned page grid">
				<div className="column twelve wide">
					<br />
					<h3 className="form sargasso">Where are you going?</h3>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<label className="sargasso">List name</label>
							<input
								placeholder="Name"
								type="text"
								name="name"
								onChange={this.handleChange}
							/>
						</Form.Field>
						<br />
						<Form.Field>
							<label className="sargasso">Number of days</label>
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
							<label className="sargasso">State</label>
							<input
								placeholder="State"
								type="text"
								name="state"
								onChange={this.handleChange}
							/>
						</Form.Field>
						<br />
						<Button color="blue" type="submit">
							<h4 className="form">Submit</h4>
						</Button>
					</Form>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Geocoding)
