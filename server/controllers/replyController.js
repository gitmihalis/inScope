import db from './../models' // defaults to index.js

const replyController = {}

replyController.create = (req, res) => {
  const { 
    text,
    postId,
    commentId,
  } = req.body

  db.User.findById(req.user._id)

    .then((existingUser) => {

      const reply = new db.Comment({
        text,
        _creator: existingUser._id,
        _post: postId,
      })
      reply.save().then((newReply) => {
        db.Comment.findByIdAndUpdate(
          commentId,
          { $push: { '_replies': newReply._id }})
            .then( () => {
              return res.status(200).json({
                success: true,
                data: newReply,
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

export default replyController
