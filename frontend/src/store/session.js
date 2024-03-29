import jwtFetch from './jwt';
import { hideModal } from './ui';
import { receivePostErrors } from './posts';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
const RECEIVE_VIDEO = 'session/RECEIVE_VIDEO'
const REMOVE_FILE = 'session/REMOVE_FILE'
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
})

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

const receiveVideo = (video) => ({
    type: RECEIVE_VIDEO,
    video
})

export const removeFile = () => ({
    type: REMOVE_FILE
})

const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
})

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})

export const signup = user => startSession(user, 'api/users/register')
export const login = user => startSession(user, 'api/users/login')

const startSession = (userInfo, route) => async dispatch => {
    try {
        const res = await jwtFetch(route, {
            method: "POST",
            body: JSON.stringify(userInfo)
        })

        const { user, token } = await res.json()
        localStorage.setItem('jwtToken', token)
        dispatch(hideModal())
        return dispatch(receiveCurrentUser(user))
    } catch(err) {
        const res = await err.json()
        if (res.statusCode === 400){
            return dispatch(receiveErrors(res.errors))
        }
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    dispatch(logoutUser())
}

export const uploadVideo = (file) => async dispatch => {
    const videoData = new FormData();
    videoData.set("video", file);

    try {
        const res = await jwtFetch(`/api/posts/uploadVideo`, {
            method: 'POST',
            body: videoData
        })
        const video = await res.json()
        dispatch(receiveVideo(video))
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receivePostErrors(res.errors))
        }
    }
}

const initialState = { user: undefined, file: undefined }

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { ...state, user: action.currentUser}
        case RECEIVE_USER_LOGOUT:
            return initialState
        case RECEIVE_VIDEO:
            return { ...state, file: action.video.result }
        case REMOVE_FILE: 
            return {...state, file: null}
        default:
            return state
    }
}


const nullErrors = null
export const sessionErrorsReducer = (state = nullErrors, action) => {
    switch(action.type){
        case RECEIVE_SESSION_ERRORS:
            return action.errors
        case RECEIVE_CURRENT_USER:
        case CLEAR_SESSION_ERRORS:
            return nullErrors;
        default:
            return state
    }
}

export const getCurrentUser = () => async dispatch => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
};