import seqModel from '../models/sequence'

async function getNextSequence() {
    const ret = await seqModel.findByIdAndUpdate(
        'sequence', 
        { $inc: { seq: 1} },
        { new: true, upsert: true }
    )
    return ret.seq;
}

export default getNextSequence