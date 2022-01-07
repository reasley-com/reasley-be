import postModel from '../models/post'

export const postGet = async (req, res) => {
    // 인자 기록 & 기본 값 세팅
    let args = req.params
    if ( !args.sort ) args.sort = 'asc'
    if ( !args.keyword ) args.keyword = ''

    // 최신 글 리스트
    if ( args.type == 'recently' ) {
        try {
            const posts = await postModel.find({}).sort({ createAt: args.sort == 'asc' ? -1 : 1 })
            return res.json({ status: 200, result: posts })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 카테고리 글 리스트
    if ( args.type == 'category' ) {
        try {
            const posts = await postModel.find({ category: keyword }).sort({ createAt: args.sort == 'asc' ? -1 : 1 })
            return res.json({ status: 200, result: posts })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 인기 글 리스트
    if ( args.type == 'top' ) {
        
        return res.json()
    }

    // 검색 글 리스트
    if ( args.type == 'search' ) {
        try {
            const posts = await postModel.find({
                $or:[
                    {title: new RegExp(`${keyword}`, 'i')},
                    {body: new RegExp(`${keyword}`, 'i')} ]
                }).sort({ createAt: args.sort == 'asc' ? -1 : 1 })
            return res.json({ status: 200, result: posts })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 단일 글 정보
    return res.json()
}

export const postAdd = async (req, res) => {
    const { title, status, tag, category } = req.body

    try {
        await postModel.create({
            title,
            tag: tag.split(','),
            category,
            status
        })
        return res.json({ status: 200 })
    } catch (err) {
        return res.json({ status: 500, result: `Error: ${err._message}` })
    }
}