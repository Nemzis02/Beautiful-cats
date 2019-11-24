module.exports = schemas = `
  type Query { 
    posts: [Post]
    post(id: ID!): Post
   }

  type Mutation {
    addPost(post: PostInput!): Post
    addComment(comment: CommentInput!): Comment
  }

  type User {
    userName: String!
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
  }

  input PostInput {
    title: String
    article: String!
    images: [String]
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
  }
`;
