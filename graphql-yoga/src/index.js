const { GraphQLServer } = require("graphql-yoga");
const Authors = require("./data/authors");
const Posts = require("./data/posts");

const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
        author: [Author!]!
        post: [Post!]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }

    type Author {
        id: String!
        name: String!
        twitterHandle: String
    }

    type Post {
        id: String!
        title: String!
        body: String        
    }
`;

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    author: () => Authors,
    post: () => Posts
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("Server is running on port 4000"));
