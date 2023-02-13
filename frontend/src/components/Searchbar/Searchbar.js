import { useState } from "react"
import { FiSearch } from 'react-icons/fi'
import './Searchbar.css'

export const Searchbar = () => {
    const [search, setSearch] = useState('')

    return (
        <div className="searchbar-container">
            <div className="input-container">
                <input
                    className="search-input"
                    placeholder="Search accounts"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                ></input>
            </div>
            <div className="search-submit">
                <FiSearch size={22} color={'rgba(22, 24, 35, .34)'}/> 
            </div>
        </div>
    )
}