export const postGet = async (req, res) => {
    const type = req.params.type

    // 최신 글 리스트
    if ( type == 'recently' ) {
        return res.json()
    }

    // 카테고리 글 리스트
    if ( type == 'category' ) {
        return res.json()
    }

    // 인기 글 리스트
    if ( type == 'top' ) {
        return res.json()
    }

    // 검색 글 리스트
    if ( type == 'search' ) {
        return res.json()
    }

    // 단일 글 정보
    return res.json()
}

export const postAdd = async (req, res) => {
    return res.json({title: 'sample'})
}