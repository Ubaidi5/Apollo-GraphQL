import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import classNames from "classnames";
import { Link } from "react-router-dom";

const LAUNCHES_QUERY = gql`
	query LaunchesQuery {
		launches {
			flight_number
			mission_name
			launch_date_local
			upcoming
		}
	}
`;

//Our main Launch Component

class Launches extends Component {
	render() {
		return (
			<div>
				<h1 className='display-4 my-3'>Launches</h1>
				<Query query={LAUNCHES_QUERY}>
					{({ loading, error, data }) => {
						if (loading) return <h4>Loading...</h4>;
						if (error) console.log(error);

						return (
							<>
								<MissionKey />
								{data.launches.map((launch) => (
									<LaunchItem key={launch.flight_number} launch={launch} />
								))}
							</>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default Launches;

// Component which contain Launch items

const LaunchItem = (props) => {
	return (
		<div className='card card-body mb-3'>
			<div className='row'>
				<div className='col-md-9'>
					<h4>
						Mission:{" "}
						<span
							className={classNames({
								"text-success": props.launch.upcoming,
								"text-danger": !props.launch.upcoming,
							})}
						>
							{props.launch.mission_name}
						</span>
					</h4>
					<p>Date: {props.launch.launch_date_local}</p>
				</div>
				<div className='col-md-3'>
					<Link
						className='btn btn-secondary'
						to={`/launch/${props.launch.flight_number}`}
					>
						Launch Details
					</Link>
				</div>
			</div>
		</div>
	);
};

// Mission Key component which tell about the colors

const MissionKey = () => {
	return (
		<div className='my-3'>
			<p>
				<span className='px-3 mr-2 bg-success'>Success</span>
			</p>
			<p>
				<span className='px-3 mr-2 bg-danger'>Fail</span>
			</p>
		</div>
	);
};
