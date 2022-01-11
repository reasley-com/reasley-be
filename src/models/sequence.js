import mongoose from 'mongoose'

var seqSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
})
const seqModel = mongoose.model('sequence', seqSchema)
export default seqModel