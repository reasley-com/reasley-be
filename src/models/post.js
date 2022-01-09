import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    seq: { type: String, required: true, unique: true },
    title: { type: String, required: true, maxLength: 50 },          // 제목
    body: { type: String, required: true },                          // 본문
    status: { type: Number, required: true },                        // 0 임시, 1 공개, 2 비공개, 3 비밀글
    tag: [{ type: String }],                                         // 태그
    createAt: { type: Date, required: true, default: Date.now() },   // 생성 일시
    editAt: { type: Date, required: true, default: Date.now() },     // 마지막 수정 일시
    views: { type: Number, required: true, default: 0 },             // 조회 수
    category: { type: String, required: true },                      // 카테고리
    comment: [{ type: String, default: [] }]                         // 댓글
})

// Middleware is must be configured before module creation
postSchema.pre('save', async function () {
    console.log(this)
})

postSchema.pre('delete', async function () {
    console.log(this)
})

const postModel = mongoose.model('post', postSchema)
export default postModel