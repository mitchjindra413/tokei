import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link } from "react-router-dom";
import './UserDrop.css'

export const UserDrop = () => {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const [delayHandler, setDelayHandler] = useState(null)

    const handleMouseLeave = event => {
        setDelayHandler(setTimeout(() => {
            setShowMenu(false)
        }, 500))
    }

    const handleMouseEnter = () => {
        setShowMenu(true)
        clearTimeout(delayHandler)
    }

    useEffect(() => {
        if (!showMenu) return

        const closeMenu = () => {
            setShowMenu(false)
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    return (
        <div className="profile-button-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="user-nav">
                <img src="https://tokei-seed.s3.us-west-1.amazonaws.com/assets/blank.jpg" alt="profile"></img>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <Link to='/profile'>
                        <li><i className="fa-regular fa-user li-icon"></i>View profile</li>
                    </Link>
                    <hr style={{ color: '#ebebeb' }}></hr>
                    <a href="https://www.linkedin.com/in/mitchell-jindra/" target="_blank" rel="noreferrer"><li><i className="fa-brands fa-linkedin-in li-icon"></i>LinkedIn</li></a>
                    <a href="https://mitchjindra413.github.io/Portfolio-Website/" target="_blank" rel="noreferrer"><li><i className="fa-solid fa-globe li-icon"></i>Portfolio</li></a>
                    <a href="https://github.com/mitchjindra413/FullStack-Project" target="_blank" rel="noreferrer"><li> <i className="fa-brands fa-github li-icon"></i>Github</li></a>
                    <hr style={{ color: '#ebebeb' }}></hr>
                    <li onClick={() => dispatch(logout())} style={{ cursor: 'pointer' }}> <i className="fa-solid fa-arrow-right-from-bracket li-icon"></i>Log Out</li>
                </ul>
            )}
        </div>
    )
}