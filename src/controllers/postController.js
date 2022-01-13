import categoryModel from '../models/category'
import postModel from '../models/post'

export const postGet = async (req, res) => {
    // 인자 기록 & 기본 값 세팅
    let args = req.params

    // 최신 글 리스트
    if ( args.type == 'recently' ) {
        try {
            const post = await postModel.find({}).sort({ createAt: -1 })
            return res.json({ status: 200, result: post })
        } catch (err) {
            return res.json({ status: 500, result: `Error: ${err._message}` })
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
            const post = await postModel.find({}).sort({ createAt: -1 })
            return res.json({ status: 200, result: post[0] })
        } catch {
            return res.json({ status: 500 })
        }
    }

    return res.json({ status: 500 })
}
  
export const postAdd = async (req, res) => {
    // const { title, status, body, tag, category } = req.body
    const data = req.body

    const category = await categoryModel.findOne({
        $or:[
            { name: data.category },
            { "childern.name": data.category }]
    })

    let categoryID
    if ( category.name == data.category ) {
        categoryID = category._id
    } else {
        categoryID = category.childern[category.childern.findIndex( (element) => element.name === data.category )]._id
    }
    console.log( categoryID )

    try {
        await postModel.create({
            seq: 0,
            title: data.title,
            body: data.body,
            tag: data.tag.split(','),
            category: categoryID,
            status: data.status
        })
        return res.json({ status: 200 })
    } catch (err) {
        console.log(err)
        return res.json({ status: 500, result: `Error: ${err._message}` })
    }
}





export const postEdit = async (req, res) => {
    let data = req.body

    try {
        const deleteCount = await postModel.findOneAndUpdate(
            { seq: data.seq },
            { 
                title: data.title,
                body: data.body,
                tag: data.tag.split(','),
                category: data.category,
                status: data.status,
            }
        )
        return res.json({ status: 200})
    } catch (err) {
        console.log(err)
        return res.json({ status: 500, result: `Error: ${err._message}` })
    }
}

export const postRemove = async (req, res) => {
    let data = req.body

    try {
        const deleteCount = await postModel.deleteMany({ seq: { $in: data.seq.map(Number) } })
        return res.json({ status: 200, result: deleteCount })
    } catch (err) {
        console.log(err)
        return res.json({ status: 500, result: `Error: ${err._message}` })
    }
}