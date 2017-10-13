import db from './../models' // defaults to index.js

const postController = {}

postController.upVote = (req, res) => {
  const postId = req.params.postId

  db.User.findById(req.user._id).then((existingUser) => {
    db.Post.findByIdAndUpdate( postId, {
      $addToSet: { '_upVoters': existingUser._id }  
    }).then((existingPost) => {
        return res.status(200).json({
          success: true,
          data: existingPost
        })
      // handle duplicate vote 
      })
      .catch((err) => res.status(409).json({ message: err }))
    })
    .catch((err) => res.status(402).json({ message: err }))
  .catch((err) => res.status(500).json({ message: err }))
}

postController.downVote = (req, res) => {
  const postId = req.params.postId

  db.User.findById(req.user._id).then((existingUser) => {
     db.Post.findByIdAndUpdate(postId, {
      $addToSet: { '_downVoters': existingUser._id } 
    }).then((existingPost) => {
        return res.status(200).json({
          success: true,
          data: existingPost
        })
      // handle duplicate vote
      }).catch(err => res.status(409).json({ message: err }))     
    }).catch((err) =>  res.status(500).json({ message: err }))
  .catch((err) => res.status(500).json({ message: err }))
}

postController.create = (req, res) => {
  const {
    title,
    text,
    link,
    occurringAt,
    scope,
   } = req.body

  db.User.findById(req.user._id).then((existingUser) => {

      const post = new db.Post({
        title,
        text,
        link,
        occurringAt,
        _scope: scope,
        _creator: existingUser._id,
      })

      post.save().then((newPost) => {
        res.status(200).json({
          data: newPost,
          success: true,
        })
      })
      .catch(err => res.status(500).json({ message: err }))
  }).catch(err => res.status(401).json({ message: err }))
}


postController.getAll = (req, res) => {
  db.Post.find({}).populate({
    path: '_creator',
    select: 'username createdAt -_id'
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
  db.Post.find({ scope  }).populate({
    path: '_creator',
    select: 'username'
  }).then((posts) => {
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
