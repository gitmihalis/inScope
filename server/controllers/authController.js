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

export default authController
