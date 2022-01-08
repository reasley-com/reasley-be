import express from 'express'
import { postGet, postAdd } from '../controllers/postController.js'
const postRouter = express.Router()

postRouter.route('/:type?/:keyword?').get(postGet).post(postAdd).delete()

export default postRouter