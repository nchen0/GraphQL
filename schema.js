const axios = require("axios");

// This is where all of our GraphQL stuff will go. There are a lot of types that we can use.
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql"); // Bringing this in from the graphql module.
// We're going to have launches and rockets.

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    // Each field we have will also have a type.
    flight_number: {
      type: GraphQLInt
    },
    mission_name: {
      type: GraphQLString
    },
    launch_year: {
      type: GraphQLString
    },
    launch_date_local: {
      type: GraphQLString
    },
    launch_success: {
      type: GraphQLBoolean
    },
    rocket: {
      // Rocket will be another rocket type (relationship)
      type: RocketType
    }
  })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    // Each field we have will also have a type.
    rocket_id: {
      type: GraphQLString
    },
    rocket_name: {
      type: GraphQLString
    },
    rocket_type: {
      type: GraphQLString
    }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios.get("https://api.spacexdata.com/v3/launches").then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
