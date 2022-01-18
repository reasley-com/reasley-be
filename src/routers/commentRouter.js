import express from 'express'
import { commentGet, commentAdd } from '../controllers/commentController'
const commentRouter = express.Router()

commentRouter.route('/:type?/:seq?').get(commentGet).post(commentAdd).delete()

export default commentRouter