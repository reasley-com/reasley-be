import express from 'express'
import morgan from 'morgan'

import postRouter from './routers/postRouter'
import commentRouter from './routers/commentRouter'

const app    = express()
const logger = morgan('dev')

// View Engine Setting
//app.set('view engine', 'pug')
app.use(logger)
app.use('/post', postRouter)
app.use('/comment', commentRouter)

export default app