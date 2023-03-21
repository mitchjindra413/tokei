import { useEffect, useState } from "react"
import { FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from "react-redux"
import './Searchbar.css'
import { fetchAccounts } from "../../store/search"

export const Searchbar = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const results = useSelector(state => Object.values(state.entities.search))
    const [focused, setFocused] = useState(false)

    const dropdown = () => {
        if (results.length > 0 && focused ){
            return (<div className="search-results-container">

                <p className="accounts-title">Accounts</p>
                {results.map(result => (
                    <div className="result-info" key={result._id}>
                        <img className="photo-search" alt="profile-photo" src={result.profilePhoto}></img>
                        <p className="username-result">{result.username}</p>
                    </div>
                ))}

                {/* <p className="view-all">View all results for "{search}"</p> */}
            </div>)
        } 
        return null
    }

    return (
        <>
            <div className="searchbar-container">
                <div className="input-container">
                    <input
                        className="search-input"
                        placeholder="Search accounts"
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value)
                            dispatch(fetchAccounts(e.target.value))
                        }}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)} 
                    ></input>
                </div>
                <div className="search-submit">
                    <FiSearch size={22} color={'rgba(22, 24, 35, .34)'}/> 
                </div>
            </div>
            {dropdown()}
        </>
    )
}