import express from 'express'
import { postGet, postAdd, postRemove } from '../controllers/postController.js'
const postRouter = express.Router()

postRouter.route('/:type?/:keyword?').get(postGet).post(postAdd).delete( postRemove)

export default postRouter