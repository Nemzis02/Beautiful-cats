import { gql } from 'apollo-boost';

export const ADD_POST = gql`
  mutation AddPost(
    $title: String
    $article: String!
    $images: [String]
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
      title
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($text: String!, $author: String!, $post: ID!) {
    addComment(comment: { text: $text, author: $author, post: $post }) {
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
  ) {
    addComment(
      comment: {
        text: $text
        author: $author
        post: $post
        parentComment: $parentComment
        repliedTo: $repliedTo
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
