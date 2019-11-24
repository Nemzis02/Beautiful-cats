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
