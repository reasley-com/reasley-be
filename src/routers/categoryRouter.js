import express from 'express'
import { categoryGet, categoryAdd, categoryEdit, categoryRemove } from '../controllers/categoryController'
const categoryRouter = express.Router()

categoryRouter.route('/:keyword?').get(categoryGet).post(categoryAdd).put(categoryEdit).delete(categoryRemove)

export default categoryRouter