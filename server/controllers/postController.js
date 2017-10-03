import db from './../models' // defaults to index.js

const postController = {}

postController.create = (req, res) => {
  const {
    date, 
    title,
    text,
    link,
    userId, // will be JWT
    scope,
   } = req.body

  // Validation for either text or link NOT both

  const post = new db.Post({
    title,
    text,
    link,
    date,
    scope,
    _creator: userId,
  })

  post.save().then((newPost) => {
    res.status(200).json({
      data: newPost,
      success: true,
    })
  }).catch((err) => {
    res.status(500).json({
      message: err
    })
  })
}


postController.getAll = (req, res) => {
  db.Post.find({}).populate({
    path: '_creator',
    select: 'username createdAt -_id'
  }).populate({
    path: '_comments',
    select: 'text createdAt _creator',
    match: { 'isDeleted': false }
  }).then((posts) => {
    res.status(200).json({
      success: true,
      data: posts,
    })
  }).catch((err) => {
    res.status(500).json({
      message: err
    })
  })
}

postController.getAllInScope = (req, res) => {
  const scope = req.params.scope
  
  console.log(scope)
  db.Post.find({ scope  })
    .then((posts) => {
      res.status(200).json({
        success: true,
        data: posts
      })
    })
    .catch((err) => { res.status(500).json({ message: err })})
}

// SHOW POST
postController.getOne = (req, res) => {
  const postId = req.params.postId
  db.Post.findOne({ id: postId })
    .then((existingPost) => {
      res.status(200).json({
        success: true,
        data: existingPost
      })
    })
    .catch((err) => res.status(500).json({message: err}))
}

export default postController
