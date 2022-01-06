import './db'
import './models/post'
import app from './index.js'

const PORT = 8080

app.listen(PORT, () => console.log(`✔ Server Listen for ${PORT} port`))