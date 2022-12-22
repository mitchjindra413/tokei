import jwtFetch from "./jwt"

const RECEIVE_POSTS = 'entities/RECEIVE_POSTS'
const RECEIVE_POST = 'entities/RECEIVE_POST'
const RECEIVE_POST_ERRORS = 'session/RECEIVE_POST_ERRORS'
const CLEAR_POST_ERRORS = 'session/CLEAR_POST_ERRORS'

const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
})

const receivePostErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
})

export const clearPostErrors = errors => ({
    type: CLEAR_POST_ERRORS
})

export const fetchPosts = (filters) => async dispatch => {
    try {
        const filterParams = new URLSearchParams(filters)
        const res = jwtFetch('/api/posts/')
        const posts = await res.json()
        dispatch(receivePosts(posts))
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receivePostErrors(res.errors))
        }
    }
}

export const fetchPost = (postId) => async dispatch => {
    try {
        const res = jwtFetch(`/api/posts/${postId}`)
        const post = await res.json()
        dispatch(receivePost(post))
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receivePostErrors(res.errors))
        }
    }
}

export const deletePost = (postId) => async dispatch => {
    try {
        const res = jwtFetch(`/api/posts/${postId}`)
        const post = await res.json()
        dispatch(receivePosts(post))
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receivePostErrors(res.errors))
        }
    }
}

const nullErrors = null
export const postErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors
        case CLEAR_POST_ERRORS:
            return nullErrors
        default:
            return state
    }
}

export const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...action.posts }
        case RECEIVE_POST:
            return { ...state, [action.post._id]: action.post }
        case REMOVE_POST:
            const newState = { ...state }
            delete newState[action.postId]
            return newState
        default:
            return state
    }
}
