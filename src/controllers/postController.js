import postModel from '../models/post'

export const postGet = async (req, res) => {
    const args = req.params.type
    console.log(args)

    // 최신 글 리스트
    if ( args == 'recently' ) {
        try {
            const posts = await postModel.find({})
            return res.json({ status: 200, result: posts })
        } catch {
            return res.json({ status: 500 })
        }
    }

    // 카테고리 글 리스트
    if ( args == 'category' ) {
        return res.json()
    }

    // 인기 글 리스트
    if ( args == 'top' ) {
        return res.json()
    }

    // 검색 글 리스트
    if ( args == 'search' ) {
        return res.json()
    }

    // 단일 글 정보
    return res.json()
}

export const postAdd = async (req, res) => {
    const { title, tag, category } = req.body

    try {
        await postModel.create({
            title,
            tag: tag.split(','),
            category,
        })
        return res.json({ status: 200 })
    } catch (err) {
        return res.json({ status: 500, result: `Error: ${err._message}` })
    }
}