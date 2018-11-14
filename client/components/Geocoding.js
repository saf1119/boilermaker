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
								<h3 className="sargasso form">Where are you going?</h3>
								<Form onSubmit={this.handleSubmit}>
								<br />
									<Form.Field>

										<input
											placeholder="List Name"
											type="text"
											name="name"
											onChange={this.handleChange}
										/>
									</Form.Field>
									<br />
									<br />
									<Form.Field>
										<input
											placeholder="Number of days"
											type="text"
											name="numDays"
											onChange={this.handleChange}
										/>
									</Form.Field>
									<br />
									<br />
									<Form.Field>
										<input
											placeholder="City"
											type="text"
											name="city"
											onChange={this.handleChange}
										/>
									</Form.Field>
									<br />
									<br />
									<Form.Field>
										<input
											placeholder="State"
											type="text"
											name="state"
											onChange={this.handleChange}
										/>
									</Form.Field>
									<br />
									<br />
									<Button type="submit" size="small" color="blue">Submit</Button>
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
