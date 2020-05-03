import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
	query LaunchQuery($flight_number: Int!) {
		launch(flight_number: $flight_number) {
			flight_number
			mission_name
			launch_year
			upcoming
			launch_date_local
			rocket {
				rocket_id
				rocket_name
				rocket_type
			}
		}
	}
`;

export default class Launch extends Component {
	render() {
		let { flight_number } = this.props.match.params;
		flight_number = parseInt(flight_number);

		return (
			<div>
				<Query query={LAUNCH_QUERY} variables={{ flight_number }}>
					{({ loading, error, data }) => {
						if (loading) return <h4>Loading...</h4>;
						if (error) return console.log(error);

						return (
							<div>
								<h1 className='display-4 my-3 '>
									{" "}
									<span style={{ color: "rgba(255,0,0,0.3)" }}>
										Mission:
									</span>{" "}
									{data.launch.mission_name}
								</h1>
								<h4 className='mb-3'>Mission Details</h4>
								<ul className='list-group'>
									<li className='list-group-item'>
										Flight Number: {flight_number}
									</li>
									<li className='list-group-item'>
										Launch Year: {data.launch.launch_year}
									</li>
									<li className='list-group-item'>
										Launch Success:{" "}
										<span
											className={classNames({
												"text-success": data.launch.upcoming,
												"text-danger": !data.launch.upcoming,
											})}
										>
											{data.launch.upcoming ? "Yes" : "No"}
										</span>
									</li>
									<li className='list-group-item'>
										Flight Number: {flight_number}
									</li>
								</ul>
								<h4 className='my-3'>Rocket Details</h4>
								<ul className='list-group'>
									<li className='list-group-item'>
										Rocket ID: {data.launch.rocket.rocket_id}
									</li>
									<li className='list-group-item'>
										Rocket Name: {data.launch.rocket.rocket_name}
									</li>
									<li className='list-group-item'>
										Rocket Type: {data.launch.rocket.rocket_type}
									</li>
								</ul>
								<hr />
								<Link to='/' className='btn btn-secondary'>
									Back
								</Link>
							</div>
						);
					}}
				</Query>
			</div>
		);
	}
}
