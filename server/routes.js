import express from 'express'

// CONTROLLERS
import basicController from './controllers/basicController'
import authController from './controllers/authController'
import postController from './controllers/postController'
import commentController from './controllers/commentController'
import scopeController from './controllers/scopeController'
import replyController from './controllers/replyController'

const routes = express()

// BASIC ROUTES
routes.get('/', basicController.get)

// USER AUTH ROUTES
routes.post('/sign-up', authController.create)
routes.get('/logout', authController.logout)
routes.post('/login', authController.login)

// POST ROUTES
routes.post('/post', postController.create)
routes.get('/posts', postController.getAll)
routes.get('/posts/:postId', postController.getOne)

routes.get('/posts/:postId/up', postController.upVote)
routes.get('/posts/:postId/down', postController.downVote)


// SCOPES 
routes.post('/in', scopeController.create)
routes.get('/in', scopeController.getAll)
routes.get('/in/:slug', scopeController.getOne)


// COMMENT ROUTES
routes.post('/comment', commentController.create)

// REPLIES
routes.post('/reply', replyController.create)


export default routes