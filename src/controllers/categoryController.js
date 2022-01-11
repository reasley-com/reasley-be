import categoryModel from '../models/category'

export const categoryGet = async (req, res) => {
    let args = req.params

    if ( args.keyword != undefined ) {
        try {
            const category = await categoryModel.findOne({ name: args.keyword })
            return res.json({ status: 200, result: category })
        } catch {
            return res.json({ status: 500 })
        }
    }

    try {
        const category = await categoryModel.find({})
        return res.json({ status: 200, result: category })
    } catch {
        return res.json({ status: 500 })
    }
}

export const categoryAdd = async (req, res) => {
    // const { type, mainName, subName } = req.body
    const data = req.body
    const category = await categoryModel.findOne({ name: data.mainName })

    if ( data.type == 'main' ) {
        if ( category ) return res.json({ status: 200, result: `Notice: already exists` })

        try {
            await categoryModel.create({ name: data.mainName })
            return res.json({ status: 200 })
        } catch (err) {
            return res.json({ status: 500, result: `Error: ${err._message}` })
        }
    }


    if ( data.type == 'sub' ) {
        try {
            // sub document add
            if ( !category ) {
                await categoryModel.create({ 
                    name: data.mainName,
                    childern: { name: data.subName }
                })
                return res.json({ status: 200, result: `Sucesss: create` })
            }

            // sub document push
            if ( category.childern.findIndex( (element) => element.name === data.subName ) == -1 ) {
                await categoryModel.findOneAndUpdate(
                    { name: data.mainName },
                    { $push: { childern: { name: data.subName } } }
                )
                return res.json({ status: 200, result: `Sucesss: create` })
            }
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, result: `Error: ${err._message}` })
        }
        return res.json({ status: 400, result: `Notice: already exists` })
    }
}

export const categoryEdit = async (req, res) => {
    let data = req.body

    // main document id change
    if ( !data.subID ) {
        try {
            await categoryModel.findOneAndUpdate(
                data.mainID,
                { name: data.newName }
            )
            return res.json({ status: 200, result: `Success: edit` })
        } catch (err) {
            return res.json({ status: 500, result: `Error: ${err._message}` })
        }
    }

    // sub document id change
    if ( data.subID ) {
        try {
            await categoryModel.findOneAndUpdate(
                data.mainID,
                { $set: { childern: { name: data.newName } } }
            )
            return res.json({ status: 200, result: `Success: edit` })
        } catch (err) {
            return res.json({ status: 500, result: `Error: ${err._message}` })
        }
    }
    return res.json({ status: 500 })
}


export const categoryRemove = async (req, res) => {
    let data = req.body

    if ( !data.subID ) {
        try {
            const deleteCount = await categoryModel.deleteMany({ _id: { $in: data.mainID } })
            return res.json({ status: 200, result: deleteCount })
        } catch (err) {
            return res.json({ status: 500, result: `Error: ${err._message}` })
        }
    }

    if ( data.subID ) {
        try {
            await categoryModel.findOneAndUpdate(
                data.mainID,
                { $pull: { childern: { _id: data.subID } } }
            )
            return res.json({ status: 200 })
        } catch (err) {
            return res.json({ status: 500, result: `Error: ${err._message}` })
        }
    }
}