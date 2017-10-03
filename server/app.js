import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './routes'

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

const app = express()

// CONNECT TO MIDDLEWARE
app.use(bodyParser.json())
app.use('/api', routes)



export default app