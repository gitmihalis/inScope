import db from './../models' // defaults to index.js



const userController = {}

userController.create = (req, res) => {
  const { username, password } = req.body

  // Validation

  const user = new db.User({
    username,
    password
  })

  user.save().then((newUser) => {
    res.status(200).json({
      success: true,
      data: newUser
    })
  }).catch((err) => {
    res.status(500).json({
      message: err
    })
  })
}

export default userController
