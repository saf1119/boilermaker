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
									color="basic violet"
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
									<Button color="basic green" type="submit">
										Add item
									</Button>
									<h3 className="red">{props.validation}</h3>
								</Form>
								<h5 className="sargasso">What to pack: </h5>
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
												</div>
												<div className="row">
													<button
														type="button"
														className="mini ui animated basic green button"
														onClick={() => {props.handleAddQuantity(listItem)}}
													>
															<Icon name="add" />
													</button>
													<button
														type="button"
														className="mini ui animated basic red button"
														onClick={() => {props.handleSubtractQuantity(listItem)}}
													>
															<Icon name="minus" />
													</button>
													<button
														type="button"
														className="mini ui animated basic violet button"
														onClick={() => {
															props.handleDelete(
																listItem
															)
														}}
													>
															<Icon name="delete" />
													</button>
												</div>
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
