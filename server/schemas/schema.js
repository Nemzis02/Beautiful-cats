module.exports = schemas = `
  type Query { 
    posts: [Post]
    post(id: ID!): Post
   }

  type Mutation {
    addPost(post: PostInput!): Post
  }

  type User {
    userName: String!
  }

  type Post {
    _id: String!,
    title: String,
    article: String!,
    images: [String],
    author: String!,
    user: User
    createdAt: String!,
    updatedAt: String!
  }

  input PostInput {
    title: String,
    article: String!,
    images: [String],
    author: String!
  }
`;
