export const commentGet = async (req, res) => {
    const type = req.params

    // 최신 댓글 리스트
    if ( type == 'recently' ) {
        return res.json()
    }

    // 단일 글 댓글 정보
    return res.json()
}
