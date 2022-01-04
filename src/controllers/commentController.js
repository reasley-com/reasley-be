export const commandGet = async (req, res) => {
    const type = req.params.type

    // 최신 댓글 리스트
    if ( type == 'recently' ) {
        return res.json()
    }

    // 단일 글 댓글 정보
    return res.json()
}

export const postAdd = async (req, res) => {
    return res.json({title: 'sample'})
}