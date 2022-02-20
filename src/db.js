const config = require('./config')

import mongoose from 'mongoose'

mongoose.connect(`mongodb://${config.REASLEY_DB}/reasley`)
const db = mongoose.connection

db.on('error', (error) => console.log('DB Error', error))
db.once('open', () => console.log('✔ Server Connected to DB'))
