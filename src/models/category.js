import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 50 },
    childern: [
        { name: { type: String, maxLength: 50 } }
    ]
})

// Middleware is must be configured before module creation
categorySchema.pre('save', async function () {
    console.log(this)
})

const categoryModel = mongoose.model('category', categorySchema)
export default categoryModel