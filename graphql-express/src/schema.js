const _ = require("lodash");
const Authors = require("./data/authors"); // This is to make available authors.json file
const Posts = require("./data/posts"); // This is to make available post.json file

/* Here a simple schema is constructed without using the GraphQL query language. 
  e.g. using 'new GraphQLObjectType' to create an object type 
*/

let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema
} = require("graphql");

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represent an author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    twitterHandle: { type: GraphQLString }
  })
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: function(post) {
        return Authors.find(a => a.id == post.author_id);
      }
    }
  })
});

// This is the Root Query
const RootQuery = new GraphQLObjectType({
  name: "BlogAppSchema",
  fields: () => ({
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all Authors",
      resolve: function() {
        return Authors;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "List of all Posts",
      resolve: function() {
        return Posts;
      }
    }
  })
});

// This is the schema declaration
const BlogSchema = new GraphQLSchema({
  query: RootQuery
  // If you need to create or updata a datasource,
  // you use mutations. Note:
  // mutations will not be explored in this post.
  // mutation: BlogMutationRootType
});

module.exports = BlogSchema;
