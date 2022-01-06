import express from 'express'
import { commentGet } from '../controllers/commentController'
const commentRouter = express.Router()

commentRouter.route('/').get(commentGet).post(commentGet).delete()

export default commentRouter