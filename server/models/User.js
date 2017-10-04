import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose
mongoose.Promise = global.Promise



const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: [5, 'Username must be 5 characters or more.']
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [5, 'Username must be 5 characters or more.']
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  isDeleted: { type: Boolean, default: false},
})




userSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  // Encrypt Password
  const user = this
  if (!user.isModified('password')){
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, function(err, hash){
      user.password = hash
      next()
    })
  })
})



userSchema.methods.comparePassword = (password, done) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch)
  })
}



const User = mongoose.model('User', userSchema)
export default User