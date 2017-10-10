import mongoose from 'mongoose'

const { Schema } = mongoose
mongoose.Promise = global.Promise

const postSchema = new Schema({
  title: {type: String, required: true},
  link: String,
  text: String,
  occurringAt: {type: Date, required: true }, // IF IS A LINK + DATE NOT SET, GRAB THE DATE FROM THE LINK?
  isDeleted: { type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  voters: Schema.Types.Mixed, // { user: username, amount: 1 }
  _scope: { type: Schema.ObjectId, ref: 'Scope', required: true },
  _creator: { type: Schema.ObjectId, ref: 'User'},
  _comments: [{ type: Schema.ObjectId, ref: 'Comment'}],
})

postSchema.pre('save', function(next){
  // Set createdAt And Updated At
  let now = new Date()
  this.updatedAt = now
  if ( !this.createdAt ){
    this.createdAt = now
  }
  // set voteScore

  next()
})

const Post = mongoose.model('Post', postSchema)
export default Post