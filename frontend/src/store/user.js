import jwtFetch from './jwt';
import { receiveCurrentUser } from "./session"
import { receiveErrors } from "./session"

export const followUser = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/follow`, {
            method: 'PATCH',
            body: JSON.stringify({userId: userId})
        })
        const user = await res.json()
        dispatch(receiveCurrentUser(user))
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors))
        }
    }
}

export const unfollowUser = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/unfollow`, {
            method: 'PATCH',
            body: JSON.stringify({ userId: userId })
        })
        const user = await res.json()
        dispatch(receiveCurrentUser(user))
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors))
        }
    }
}