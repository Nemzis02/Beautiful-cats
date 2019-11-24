import { gql } from 'apollo-boost';

export const POSTS = gql`
  {
    posts {
      _id
      author
      title
      article
      images
      createdAt
    }
  }
`;

export const POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      _id
      author
      title
      article
      images
      createdAt
      comments {
        _id
        text
        author
        repliedTo
        replies {
          text
        }
      }
    }
  }
`;
