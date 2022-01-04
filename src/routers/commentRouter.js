import express from 'express'
import { commandGet } from '../controllers/commentController'
const commandRouter = express.Router()

commandRouter.get('/', commandGet)
commandRouter.post('/', commandGet)
commandRouter.delete('/')

export default commandRouter