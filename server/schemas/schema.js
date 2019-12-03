const { gql } = require('apollo-server');

module.exports = schemas = gql`
  scalar Upload

  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    addPost(post: PostInput!): Post
    addComment(comment: CommentInput!): Comment
    createUser(user: UserInput!): User
    signIn(credentials: CredentialsInput!): Token!
  }

  type Token {
    token: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    _id: ID!
    userName: String!
    avatar: String
    email: String
  }

  type Post {
    _id: String!
    title: String
    article: String!
    images: [String]
    author: String!
    user: User
    parentComment: Comment
    comments: [Comment]
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    _id: String!
    text: String!
    author: String!
    repliedTo: String
    replies: [Comment]
    user: User
    post: Post!
    createdAt: String!
    parentComment: ID
  }

  input PostInput {
    title: String
    article: String!
    images: [Upload!]
    author: String!
  }

  input CommentInput {
    text: String!
    author: String!
    repliedTo: String
    parentComment: ID
    user: UserInput
    post: ID!
  }

  input UserInput {
    userName: String!
    avatar: String
    email: String!
    password: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }
`;
