import postModel from '../models/post'

export const postGet = async (req, res) => {
    // 인자 기록 & 기본 값 세팅
    let args = req.params

    if ( !args.keyword ) args.keyword = ''

    // 최신 글 리스트
    if ( args.type == 'recently' ) {
        try {
            const post = await postModel.find({}).sort({ createAt: -1 })
            return res.json({ status: 200, result: post })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 카테고리 글 리스트
    if ( args.type == 'category' ) {
        try {
            const post = await postModel.find({ category: args.keyword }).sort({ createAt:-1 })
            return res.json({ status: 200, result: post })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 인기 글 리스트
    if ( args.type == 'top' ) {
        try {
            const post = await postModel.find({ category: args.keyword }).sort({ createAt:-1 })
            return res.json({ status: 200, result: post })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 검색 글 리스트
    if ( args.type == 'search' ) {
        try {
            const post = await postModel.find({
                $or:[
                    { title: new RegExp(`${args.keyword}`, 'i') },
                    { body: new RegExp(`${args.keyword}`, 'i') } ]
                }).sort({ createAt: -1 })
            return res.json({ status: 200, result: post })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 단일 글 정보
    if ( args.type == 'single' ) {
        try {
            const post = await postModel.find({ seq: args.keyword })
            return res.json({ status: 200, result: post[0] })
        } catch {
            return res.json({ status: 500 })
        }
    }
    return res.json({ status: 500 })
}
  
export const postAdd = async (req, res) => {
    const { title, status, body, tag, category } = req.body

    try {
        await postModel.create({
            seq: 0,
            title,
            body,
            tag: tag.split(','),
            category,
            status
        })
        return res.json({ status: 200 })
    } catch (err) {
        return res.json({ status: 500, result: `Error: ${err._message}` })
    }
}



export const postRemove = async (req, res) => {
    let data = req.body

    try {
        const deleteCount = await postModel.deleteMany({ seq: { $in: data.seq.map(Number) } })
        return res.json({ status: 200, result: deleteCount })
    } catch (err) {
        return res.json({ status: 500, result: `Error: ${err._message}` })
    }
}