import gql from 'graphql-tag';

export const ADD_POST = gql`
  mutation AddPost(
    $title: String
    $article: String!
    $images: [Upload!]
    $author: String!
  ) {
    addPost(
      post: {
        title: $title
        article: $article
        images: $images
        author: $author
      }
    ) {
      _id
      author
      title
      article
      images
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($text: String!, $author: String!, $post: ID!, $user: ID) {
    addComment(comment: { text: $text, author: $author, post: $post, user: $user }) {
      _id
      text
      author
      createdAt
      repliedTo
      parentComment
      user {
        userName
      }
      replies {
        _id
        author
        createdAt
        repliedTo
        parentComment
        text
        user {
          userName
        }
      }
    }
  }
`;

export const ADD_REPLY = gql`
  mutation AddReply(
    $text: String!
    $author: String!
    $post: ID!
    $parentComment: ID
    $repliedTo: String
    $user: ID
  ) {
    addComment(
      comment: {
        text: $text
        author: $author
        post: $post
        parentComment: $parentComment
        repliedTo: $repliedTo
        user: $user
      }
    ) {
      _id
      text
      author
      createdAt
      parentComment
      repliedTo
      user {
        userName
      }
      replies {
        _id
        author
        parentComment
        createdAt
        repliedTo
        text
        user {
          userName
        }
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($userName: String!, $email: String!, $password: String!) {
    createUser(
      user: { userName: $userName, email: $email, password: $password }
    ) {
      _id
      userName
      avatar
      email
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(credentials: {
      email: $email
      password: $password
    }) {
      token
    }
  }
`;
