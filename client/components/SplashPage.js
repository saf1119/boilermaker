import React from 'react'
import NavBar from './NavBar'
import {Card} from 'semantic-ui-react'

export default class SplashPage extends React.Component {
	render() {
		return (
			<div className="splash">
				<NavBar />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<div className="relative">
				<div className="bottom-right">
				<br />
				<Card fluid>
				<h2 className="padded">Are you ready for your next vacation? PackIt can help you get there!</h2>
				<h3 className="padded">PackIt will take in your personal user information and preferences, the place you're going to, and how long you'll be going for, and help you build an optimized packing list based on this information, so that you'll never forget your toothbrush again!</h3>
				<h2 className="padded">Sign up or log in to get started!</h2>
				</Card>
				</div>
				</div>
			</div>
		)
	}
}