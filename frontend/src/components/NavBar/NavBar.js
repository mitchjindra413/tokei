import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import './NavBar.css'
import { showLoginModal } from "../../store/ui"
import { SessionModal } from "../SessionForms/SessionModal"
import { UserDrop } from "./UserDrop"

export const NavBar = () => {
    const currUser = useSelector(state => state.session.user)
    const modal = useSelector(state => state.ui.modal)
    const history = useHistory()
    const dispatch = useDispatch()
    

    const whichButtons = () => {
        if(!currUser) {
            return (
                <>
                    <button className="login-button" onClick={() => dispatch(showLoginModal())}>
                        Login
                    </button>
                    <button className="three-dots">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </>
            )
        }
        return (
            <>
                <UserDrop></UserDrop>
            </>
        )
    }

    const modalSet = () => {
        if (modal === 'login' || modal === 'signup'){
            return (
                <SessionModal></SessionModal>
            )
        }
        return null
    }

    return (
        <nav>
            <div className="logo-nav" onClick={() => history.push('/')}>
                <img className="logo-img" src='https://tokei-seed.s3.us-west-1.amazonaws.com/assets/toppng.com-tiktok-logo-transparent-984x1196.png' alt="logo"></img>
                <h1>TikTokei</h1>
            </div>
            <div>
                Search bar
            </div>
            <div className="nav-buttons">
                <button 
                    className="upload-button"
                    onClick={currUser ? () => history.push('/uploads') : () => dispatch(showLoginModal())}
                >
                    <i className="fa-solid fa-plus"></i> Upload
                </button>
                {whichButtons()}
            </div>
            {modalSet()}
        </nav>
    )
}