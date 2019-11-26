const Post = require('../models/post');
const Comment = require('../models/Comment');

module.exports = resolvers = {
  Query: {
    posts: async () => {
      let posts = await Post.find()
        .sort({ createdAt: 'desc' })
        .populate('comments');
      return posts;
    },
    post: async (_, args) => {
      const post = await Post.findById(args.id).populate({ 
        path: 'comments',
        populate: {
          path: 'replies',
          model: 'Comment'
        } 
     });
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
    },
    addComment: async (_, req) => {
      const { parentComment } = req.comment;
      try {
        if (parentComment) {
          let existingComment = await Comment.findById(parentComment);
          const newComment = new Comment({ ...req.comment });
          await newComment.save();
          existingComment.replies.push(newComment);
          await existingComment.save();
          existingComment = await Comment.findById(parentComment).populate('replies');
          console.log(newComment);
          return newComment;
        } else {
          const comment = new Comment({ ...req.comment });
          await comment.save();
          const post = await Post.findById(req.comment.post);
          post.comments.push(comment._id);
          await post.save();
          console.log(comment);
          return comment;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
