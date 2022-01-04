import express from 'express'
import { postGet, postAdd } from '../controllers/postController.js'
const postRouter = express.Router()

postRouter.get('/:type', postGet)
postRouter.post('/', postAdd)
postRouter.delete('/')

export default postRouter