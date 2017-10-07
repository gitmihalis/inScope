import mongoose from 'mongoose'

const { Schema } = mongoose
mongoose.Promise = global.Promise

const scopeSchema = new Schema({
  slug: { type: String, required: true, unique: true},
  description: String,
  isDeleted: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  beginningAt: {type: Date, required: true},
  endingAt: Date,
  _moderators: [{ type: Schema.ObjectId, ref: 'User'}],
})

const Scope = mongoose.model('Scope', scopeSchema)
export default Scope