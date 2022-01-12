import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    nickname: { type: String, required: true, maxLength: 50 },
    body: { type: String, required: true, maxLength: 50 },
    createAt: { type: String, required: true, maxLength: 50 },
    editAt: { type: String, required: true, maxLength: 50 },
    status: { type: String, required: true, maxLength: 50 },
    comment: [{ type: String, default: [] }],
    password: { type: String, maxLength: 50 },
})

// Middleware is must be configured before module creation
commentSchema.pre('save', async function () {
    console.log(this)
})

const commentModel = mongoose.model('comment', commentSchema)
export default commentModel