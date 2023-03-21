import jwtFetch from './jwt';

const RECEIVE_ACCOUNTS = 'search/RECEIVE_ACCOUNTS'
const RECEIVE_ACCOUNT = 'search/RECEIVE_ACCOUNT'
const REMOVE_ACCOUNT = 'search/REMOVE_ACCOUNT'
const RECEIVE_SEARCH_ERRORS = 'search/RECEIVE_SEARCH_ERRORS'
const CLEAR_SEARCH_ERRORS = 'search/CLEAR_SEARCH_ERRORS'

const receiveAccounts = (accounts) => ({
    type: RECEIVE_ACCOUNTS,
    accounts
})

const receiveSearchErrors = (errors) => ({
    type: RECEIVE_SEARCH_ERRORS,
    errors
})

const clearSearchErrors = () => ({
    type: CLEAR_SEARCH_ERRORS
})

export const fetchAccounts = (string) => async dispatch => {
    const params = new URLSearchParams({name: string})
    dispatch(clearSearchErrors())
    try {
        const res = await jwtFetch(`/api/search?${params}`)
        const accounts = await res.json()
        dispatch(receiveAccounts(accounts))
    } catch(err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receiveSearchErrors(res.errors))
        }
    }
}

const nullErrors = null
export const searchErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_SEARCH_ERRORS:
            return { ...action.errors }
        case CLEAR_SEARCH_ERRORS:
            return nullErrors
        default:
            return state
    }
}

export const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ACCOUNTS:
            return { ...action.accounts }
        default:
            return state
    }
}