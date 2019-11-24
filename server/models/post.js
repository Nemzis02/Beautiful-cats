const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String
    },
    article: {
      type: String,
      required: true
    },
    images: [
      {
        type: String,
        default: []
      }
    ],
    author: {
      type: String,
      required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', PostSchema);
