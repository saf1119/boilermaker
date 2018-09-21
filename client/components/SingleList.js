import React from 'react'
import {Button, Icon, Form} from 'semantic-ui-react'

const SingleList = props => {
	const list = props.list
	return (
		<div>
			<div className="ui center aligned grid">
				<div className="column">
					<br />
					<h3 className="form sargasso">{list.title}</h3>
					<h5 className="form sargasso">Weather:</h5>
					<p>{list.weatherSummary}</p>
					<Button color="violet" onClick={props.saveList}>
						Save List
					</Button>
					<Form onSubmit={props.handleAdd}>
						<Form.Field>
							<br />
							<br />
							<br />
							<input
								placeholder="New checklist item"
								type="text"
								name="name"
								onChange={props.handleChange}
							/>
							<input
								placeholder="Quantity"
								type="text"
								name="quantity"
								onChange={props.handleChange}
							/>
						</Form.Field>
						<br />
						<Button color="green" type="submit">
							Add item
						</Button>
					</Form>
					<h5 className="sargasso">What to pack: </h5>
				</div>
			</div>
			<div className="ui stackable center aligned page grid">
				<div className="sargasso">
					{list.listItems.map(listItem => {
						return (
							<div
								key={listItem.name}
								className="ui stackable center aligned grid"
							>
								<h4 className="row">
									<div className="column">
										{listItem.quantity}
									</div>
									<div className="five wide column">
										{listItem.name}
									</div>
									<div className="two wide column">
										<button
											className="mini ui animated green button"
											onClick={() => {}}
										>
											<div className="visible content">
												<Icon name="add" />
											</div>
											<div className="hidden content">
												Increase
											</div>
										</button>
									</div>
									<div className="two wide column">
										<button
											className="mini ui animated red button"
											onClick={() => {}}
										>
											<div className="visible content">
												<Icon name="minus" />
											</div>
											<div className="hidden content">
												Decrease
											</div>
										</button>
									</div>
									<div className="two wide column">
										<button
											className="mini ui animated violet button"
											onClick={() => {
												props.handleDelete(listItem)
											}}
										>
											<div className="visible content">
												<Icon name="delete" />
											</div>
											<div className="hidden content">
												Delete
											</div>
										</button>
									</div>
								</h4>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default SingleList
