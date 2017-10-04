import express from 'express'

// CONTROLLERS
import basicController from './controllers/basicController'
import authController from './controllers/authController'
import postController from './controllers/postController'
import commentController from './controllers/commentController'
import scopeController from './controllers/scopeController'

const routes = express()

// BASIC ROUTES
routes.get('/', basicController.get)

// USER ROUTES
routes.post('/sign-up', authController.create)

// POST ROUTES
routes.post('/post', postController.create)
routes.get('/posts', postController.getAll)
routes.get('/posts/:id', postController.getOne)
routes.get('/s/:scope', postController.getAllInScope)

// COMMENT ROUTES
routes.post('/comment', commentController.create)

// SCOPE ROUTES
// routes.post('/s', scopeController.create)
// routes.get('/s', scopeController.getAll)

export default routes