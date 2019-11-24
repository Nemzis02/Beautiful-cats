const Post = require('../models/post');

module.exports = resolvers = {
  Query: {
    posts: async () => {
      const posts = await Post.find().sort({ createdAt: 'desc' });
      return posts;
    },
    post: async (_, args) => {
      const post = await Post.findById(args.id);
      console.log(post);
      return post;
    }
  },
  Mutation: {
    addPost: async (_, req) => {
      try {
        const post = new Post({ ...req.post });
        await post.save();
        console.log(post);
        return post;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
