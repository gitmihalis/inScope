import User from './User'
import Post from './Post'
import Comment from './Comment'
import Scope from './Scope'

// Instead of importing 3 or 4 models in a file, we can simple import an object with references to all models
export default {
  User,
  Post,
  Comment,
  Scope,
}