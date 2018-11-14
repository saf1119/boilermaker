import React from 'react'
import {Button, Icon, Form} from 'semantic-ui-react'

const SingleList = props => {
	const list = props.list
	return (
		<div className="animated fadeInLeft">
			<h1 />
			<div className="ui center aligned grid">
				<div className="width">
					<div className="tall ui fluid white card">
						<div className="ui center aligned forty wide grid">
							<div className="column">
								<br />
								<h3 className="form sargasso">{list.title}</h3>
								<h5 className="form sargasso">Weather:</h5>
								<p className="tiny-black">{list.weatherSummary}</p>
								<br />
								<Button
									size="small"
									color="blue"
									onClick={props.saveList}
								>
									Save List
								</Button>
								<Form className="padding" onSubmit={props.handleAdd}>
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
									<Button size="small" color="green" type="submit">
										Add item
									</Button>
=								</Form>
								<h5 className="sargasso">What to pack: </h5>
								<br />
							</div>
						</div>
						<div className="ui stackable center aligned page grid">
							<div className="sargasso height">
								{list.listItems.map(listItem => {
									return (
										<div
											data-aos="fade-in"
											key={listItem.name}
											className="ui stackable center aligned grid"
										>
											<h4>
												<div className="row">
													{`${listItem.quantity} ${listItem.name}`}
															<Icon color="green" name="add" onClick={() => {props.handleAddQuantity(listItem)}}/>
															<Icon color="red" name="minus" onClick={() => {props.handleSubtractQuantity(listItem)}}/>
															<Icon name="delete" onClick={() => {
															props.handleDelete(
																listItem
															)
														}} />
												</div>
												<br />
											</h4>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SingleList
