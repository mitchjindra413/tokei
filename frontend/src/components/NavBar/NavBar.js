import { useSelector } from "react-redux"
import './NavBar.css'

export const NavBar = () => {
    const currUser = useSelector(state => state.session.user)
    return (
        <nav>
            <div className="logo-nav">
                <img className="logo-img" src='https://tokei-seed.s3.us-west-1.amazonaws.com/assets/toppng.com-tiktok-logo-transparent-984x1196.png' alt="logo"></img>
                <h1>TikTokei</h1>
            </div>
            <div>
                Search bar
            </div>
            
        </nav>
    )
}