import express from 'express'
import { commentGet, commentAdd } from '../controllers/commentController'
const commentRouter = express.Router()

commentRouter.route('/').get(commentGet).post(commentAdd).delete()

export default commentRouter