import mongoose from 'mongoose'

const { Schema } = mongoose
mongoose.Promise = global.Promise

const commentSchema = new Schema({
  text: { type: String, required: true },
  length: Number,
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  _creator: { type: Schema.ObjectId, ref: 'User', required: true },
  _replies: [{ type: Schema.ObjectId, ref: 'Comment'}],
  // top level comments refer to a post
  _post: {type: Schema.ObjectId, ref: 'Post'},
})

const autoPopulateCreator = function(next) {
  this.populate({
    path: '_creator',
    select: 'username createdAt -_id'
  })
  next()
}

commentSchema.pre('find', autoPopulateCreator)


const Comment = mongoose.model('Comment', commentSchema)
export default Comment