import postModel from '../models/post'
import categoryModel from '../models/category'
import commentModel from '../models/comment'

export const commentGet = async (req, res) => {
    const args = req.params

    return res.json()
}



export const commentAdd = async (req, res) => {
    // const { title, status, body, tag, category } = req.body
    const data = req.body

    console.log(data.seq)

    const post = await postModel.exists({ seq: data.seq })
    console.log(post)

    if ( post ) {
        try {
            if ( data.status == 0 ){
            
            }
            await commentModel.create({
                nickname: data.nickname,
                body: data.body,
                status: data.status,
                referenceID: data.seq
            })
            return res.json({ status: 200 })
        } catch (err) {
            console.log(err)
            return res.json({ status: 500, result: `Error: ${err._message}` })
        }
    }
    return res.json({ status: 500 })
}
