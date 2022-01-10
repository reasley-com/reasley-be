import mongoose from 'mongoose'

var seqSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
})
const seqModel = mongoose.model('sequence', seqSchema)
export default seqModel



/*
const seqSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sequence: { type: Number, required: true }
    //_id: 'sequenceCategory',
    //sequence: 0
})

const seqModel = mongoose.model('sequence', seqSchema)
export default seqModel
*/