const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    repliedTo: {
      type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    replies: [
      { type: Schema.Types.ObjectId, ref: 'Comment' }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Comment', CommentSchema);
