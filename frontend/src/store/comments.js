import jwtFetch from "./jwt";

const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS'
const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT'
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'
const RECEIVE_COMMENT_ERRORS = 'comments/RECEIVE_COMMENT_ERRORS'
const CLEAR_COMMENT_ERRORS = 'comments/CLEAR_COMMENT_ERRORS'

const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})

const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
})

const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
})

const receiveCommentErrors = (errors) => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
})

const clearCommentErrors = () => ({
    type: CLEAR_COMMENT_ERRORS
})

export const fetchComments = (postId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/${postId}`)
        const comments = await res.json()
        dispatch(receiveComments(comments))
    } catch(err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receiveCommentErrors(res.errors))
        }
    }
}


const nullErrors = null
export const commentErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_COMMENT_ERRORS:
            return { ...action.errors }
        case CLEAR_COMMENT_ERRORS:
            return nullErrors
        default:
            return state
    }
}

export const commentsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return { ...action.comments }
        case RECEIVE_COMMENT:
            return { ...state, [action.comment._id]: action.comment }
        case REMOVE_COMMENT:
            const newState = { ...state }
            delete newState[action.commentId]
            return newState
        default:
            return state
    }
}