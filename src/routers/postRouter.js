import express from 'express'
import { postGet, postAdd } from '../controllers/postController.js'
const postRouter = express.Router()

postRouter.route('/').post(postAdd).delete()
postRouter.get('/:type', postGet)

export default postRouter