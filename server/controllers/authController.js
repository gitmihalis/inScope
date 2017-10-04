import db from './../models' // defaults to index.js
import jwt from 'jsonwebtoken'
const authController = {}



authController.create = (req, res) => {
  // Create user and JWT
  const { username, password } = req.body

  const user = new db.User({
    username,
    password
  })
  
  user.save().then((newUser) => {
    const token = jwt.sign({id: newUser._id}, process.env.SECRET, {expiresIn: '60 days'})
    
    res.status(200)
      .cookie('sToken', token, { maxAge: 900000, httpOnly: true})
      .json({
      success: true,
      data: newUser
    })
  }).catch((err) => {
    res.status(500).json({
      message: err
    })
  })
}



// LOG IN
authController.login = (req, res, next) => {
  const { username, password } = req.body

  db.User.findOne({ username }, "+password")
    .then((existingUser) => {

      existingUser.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials"})
        }

        const token = jwt.sign({id: existingUser._id}, process.env.SECRET, {expiresIn: '60 days'})

        return res.cookie('sToken', token, { maxAge: 900000, httpOnly: true })
          .status(200)
          .json({
            success: true
          })
      })

    })
    .catch(err => res.status(500).json({ message: err }))
}



authController.logout = (req, res) => {
  res.clearCookie('sToken').json({
    message: 'Successfully logged out'
  })
}

export default authController
