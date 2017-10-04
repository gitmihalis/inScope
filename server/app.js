require('dotenv').config()

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import routes from './routes'
import jwt from 'jsonwebtoken'

const app = express()


// Connect to DATABASE
mongoose.connect(
  'mongodb://localhost:27017/scopeit_dev', 
  { 
    useMongoClient: true,
    promiseLibrary: global.Promise 
  }, () => {
  console.log('connected to mongodb')
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// Define Custom middleware
const checkAuth = (req, res, next) => {
  console.log('Checking for authentication')

  if (typeof req.cookies.sToken === 'undefined' || req.cookies.nToken === null){
    req.user = null
  } else {
    const token = req.cookies.sToken
    const decodedToken = jwt.decode(token, { complete: true }) || {}
    req.user = decodedToken.payload
  }

  next()
}
// CONNECT TO MIDDLEWARE *order matters!
app.use(bodyParser.json())
app.use(cookieParser())

app.use(checkAuth)

app.use('/api', routes)




export default app