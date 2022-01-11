import express from 'express'
import morgan from 'morgan'

import postRouter from './routers/postRouter'
import commentRouter from './routers/commentRouter'
import categoryRouter from './routers/categoryRouter'

const app    = express()
const logger = morgan('dev')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use('/post', postRouter)
app.use('/category', categoryRouter)
app.use('/comment', commentRouter)

export default app