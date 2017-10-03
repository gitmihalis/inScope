import db from './../models' // defaults to index.js



const commentController = {}

commentController.create = (req, res) => {
  const { 
    text,
    userId,
    postId,
  } = req.body

  // Validation

  const comment = new db.Comment({
    text,
    _creator: userId,
    _post: postId,
  })

  comment.save().then((newComment) => {
    db.Post.findByIdAndUpdate(
      postId,
      { $push: { '_comments': newComment._id }}
    ).then( () => {
      res.status(200).json({
        success: true,
        data: newComment,
      })
    }).catch((err) => {
      res.status(500).json({
        message: err
      })
    })
  }).catch((err) => {
    res.status(500).json({
      message: err
    })
  })
}

export default commentController
