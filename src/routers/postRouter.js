import express from 'express'
import { postGet, postAdd, postEdit, postRemove } from '../controllers/postController.js'
const postRouter = express.Router()

postRouter.route('/:type?/:keyword?').get(postGet).post(postAdd).put(postEdit).delete( postRemove)

export default postRouter