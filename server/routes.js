import express from 'express'

// CONTROLLERS
import basicController from './controllers/basicController'
import userController from './controllers/userController'
import postController from './controllers/postController'
import commentController from './controllers/commentController'
import scopeController from './controllers/scopeController'

const routes = express()

// BASIC ROUTES
routes.get('/', basicController.get)

// USER ROUTES
routes.post('/signup', userController.create)

// POST ROUTES
routes.post('/post', postController.create)
routes.get('/posts', postController.getAll)
routes.get('/posts/:id', postController.getOne)

// COMMENT ROUTES
routes.post('/comment', commentController.create)

// SCOPE ROUTES
routes.post('/s', scopeController.create)
routes.get('/s', scopeController.getAll)
routes.get('/s/:slug', scopeController.getOne)

export default routes