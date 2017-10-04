import db from './../models' // defaults to index.js



const commentController = {}

commentController.create = (req, res) => {
  const { 
    text,
    postId,
  } = req.body

  db.User.findById(req.user._id)

    .then((existingUser) => {

      const comment = new db.Comment({
        text,
        _creator: existingUser._id,
        _post: postId,
      })

      comment.save().then((newComment) => {
        db.Post.findByIdAndUpdate(
          postId,
          { $push: { '_comments': newComment._id }})
            .then( () => {
              return res.status(200).json({
                success: true,
                data: newComment,
              })
            })
            .catch((err) => {
              return res.status(500).json({
                message: err
              })
            })
      }).catch((err) => {
        return res.status(500).json({
          message: err
        })
      })
    })
    .catch( (err) => { return res.status(400).json({ message: err })})
}

export default commentController
