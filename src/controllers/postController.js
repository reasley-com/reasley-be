import postModel from '../models/post'

export const postGet = async (req, res) => {
    // 인자 기록 & 기본 값 세팅
    let args = req.params
    if ( !args.keyword ) args.keyword = ''

    // 최신 글 리스트
    if ( args.type == 'recently' ) {
        try {
            const posts = await postModel.find({}).sort({ createAt: -1 })
            return res.json({ status: 200, result: posts })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 카테고리 글 리스트
    if ( args.type == 'category' ) {
        try {
            const posts = await postModel.find({ category: args.keyword }).sort({ createAt:-1 })
            return res.json({ status: 200, result: posts })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 인기 글 리스트
    if ( args.type == 'top' ) {
        try {
            const posts = await postModel.find({ category: args.keyword }).sort({ createAt:-1 })
            return res.json({ status: 200, result: posts })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 검색 글 리스트
    if ( args.type == 'search' ) {
        try {
            const posts = await postModel.find({
                $or:[
                    { title: new RegExp(`${args.keyword}`, 'i') },
                    { body: new RegExp(`${args.keyword}`, 'i') } ]
                }).sort({ createAt: -1 })
            return res.json({ status: 200, result: posts })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 단일 글 정보
    return res.json()
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
    let args = req.body

    try {
        const deleteCount = await postModel.deleteMany({ seq: { $in: args.seq.map(Number) } })
        return res.json({ status: 200, result: deleteCount })
    } catch (err) {
        return res.json({ status: 500, result: `Error: ${err._message}` })
    }
}