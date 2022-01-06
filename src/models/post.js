import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength: 50 },
    tag: [{ type: String }],
    createAt: { type: Date, required: true, default: Date.now() },
    editAt: { type: Date, required: true, default: Date.now() },
    views: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    comment: [{ type: String, default: [] }]
})

// Middleware is must be configured before module creation
postSchema.pre('save', async function () {
    console.log(this)
})

const postModel = mongoose.model('post', postSchema)
export default postModel