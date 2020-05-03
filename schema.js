const {
	GraphQLInt,
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLBoolean,
} = require("graphql");
const axios = require("axios");

// Launch Type

const LaunchType = new GraphQLObjectType({
	name: "Launch",
	fields: () => ({
		mission_name: { type: GraphQLString },
		launch_year: { type: GraphQLString },
		upcoming: { type: GraphQLBoolean },
		flight_number: { type: GraphQLInt },
		rocket: { type: RocketType },
	}),
});

// Rocket Type
const RocketType = new GraphQLObjectType({
	name: "Rocket",
	fields: () => ({
		rocket_name: { type: GraphQLString },
		rocket_type: { type: GraphQLString },
		rocket_id: { type: GraphQLString },
	}),
});

// Root Query
const RootQyery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		launches: {
			type: new GraphQLList(LaunchType),
			resolve(parent, args) {
				return axios
					.get("https://api.spacexdata.com/v3/launches")
					.then((res) => res.data);
			},
		},
		launch: {
			type: LaunchType,
			args: { flight_number: { type: GraphQLInt } },
			resolve(parent, args) {
				return axios
					.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
					.then((res) => res.data);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQyery,
});
