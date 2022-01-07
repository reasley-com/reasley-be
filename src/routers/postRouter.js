import express from 'express'
import { postGet, postAdd } from '../controllers/postController.js'
const postRouter = express.Router()

postRouter.route('/:type?/:sort?/:keyword?').get(postGet).post(postAdd).delete()

export default postRouter