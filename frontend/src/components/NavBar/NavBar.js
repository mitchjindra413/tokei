import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import './NavBar.css'
import { showLoginModal } from "../../store/ui"
import { LoginFormModal } from "../SessionForms/LoginFormModal"

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
                <div className="user-nav">
                    <img src="https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1594805258216454~c5_720x720.jpeg?x-expires=1671238800&x-signature=Di%2BU96j9c5UyUrwJkxjCXWA%2FKPs%3D" alt="profile"></img>
                </div>
            </>
        )
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
            {modal === 'login' &&(<LoginFormModal></LoginFormModal>)}
        </nav>
    )
}