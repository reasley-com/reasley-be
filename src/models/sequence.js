import mongoose from 'mongoose'

const seqSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sequence: { type: Number, required: true }
    //_id: 'sequenceCategory',
    //sequence: 0
})

const seqModel = mongoose.model('sequence', seqSchema)
export default seqModel