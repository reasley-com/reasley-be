import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    nickname: { type: String, required: true, maxLength: 50 },
    body: { type: String, required: true, maxLength: 50 },
    createAt: { type: Date, required: true, maxLength: 50, default: Date.now() },
    editAt: { type: Date, required: true, maxLength: 50, default: Date.now() },
    status: { type: Number, required: true, maxLength: 50 },
    password: { type: String, maxLength: 50 },
    referenceID: { type: Number, required: true }
})

// Middleware is must be configured before module creation
commentSchema.pre('save', async function () {
    console.log(this)
})

const commentModel = mongoose.model('comment', commentSchema)
export default commentModel