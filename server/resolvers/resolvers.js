const path = require('path');
const { createWriteStream } = require('fs');
const bcrypt = require('bcryptjs');

const Post = require('../models/post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const validators = require('../validators');

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
        const filesPromises = req.post.images.map(file => {
          return new Promise(async (resolve, reject) => {
            const { createReadStream, filename } = await file;
            const date = Date.now();
            createReadStream()
              .pipe(
                createWriteStream(
                  path.join(
                    __dirname,
                    '../public/images',
                    `${date}-${filename}`
                  )
                )
              )
              .on('close', () => {
                resolve(`images/${date}-${filename}`);
              })
              .on('error', err => reject(err));
          });
        });
        const images = await Promise.all(filesPromises);
        const post = new Post({ ...req.post });
        post.images = images;
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
          existingComment = await Comment.findById(parentComment).populate(
            'replies'
          );
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
    },
    createUser: async (_, req) => {
      try {
        await validators.createUser.validate(req.user);
        const isUserExists = await User.findOne({ email: req.user.email });

        if (isUserExists) {
          throw new Error('This email was alredy used by another user');
        }

        const user = new User({ ...req.user });
        const encryptedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash('password', 12, (err, encryptedPassword) => {
            if (err) {
              reject(err);
            }
            resolve(encryptedPassword);
          });
        });

        user.password = encryptedPassword;
        await user.save();
        console.log(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    signIn: async (_, req) => {
      try {
        console.log('hello');
      } catch (error) {
        console.log(error);
      }
    }
  }
};
