import { useSelector } from 'react-redux'
import './Sidebar.css'

export const Sidebar = () => {
    const user = useSelector(state => state.session.user)
    return (
        <div className="sidebar-container">
            <div className='spacing-div'>
                <div className="feed-div">
                    <div className="feed-selector">
                        <i className="fa-solid fa-house fa-xl"></i>
                        <h2>For You</h2>
                    </div>
                    <div className="feed-selector">
                        <i className="fa-solid fa-user-group fa-xl"></i>
                        <h2>Following</h2>
                    </div>
                </div>
            </div>
            <div className='spacing-div'>
                <div className="feed-div">
                    <h4>Popular topics</h4>
                    <div className="feed-selector">
                        <i className="fa-solid fa-face-laugh-beam fa-xl"></i>
                        <h2>Comedy</h2>
                    </div>
                    <div className="feed-selector">
                        <i className="fa-solid fa-compact-disc fa-xl"></i>
                        <h2>Dance</h2>
                    </div>
                    <div className="feed-selector">
                        <i className="fa-solid fa-gamepad fa-xl"></i>
                        <h2>Gaming</h2>
                    </div>
                </div>
            </div>
            <div className='spacing-div'>
                <div className="feed-div">
                    <h4>Following Accounts</h4>
                    {user.following ? <p>following</p> : <p className='no-following'>Accounts you follow will appear here</p>}
                </div>
            </div>
            <div className='spacing-div'>
                <div className="feed-div">
                    <h4>Discover</h4>
                    
                </div>
            </div>
            <div className="feed-div">
                <div className='info-div'>
                    <a className='bottom-text' href="https://www.linkedin.com/in/mitchell-jindra/" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a className='bottom-text' href="https://mitchjindra413.github.io/Portfolio-Website/" target="_blank" rel="noreferrer">Portfolio</a>
                    <a className='bottom-text' href="https://github.com/mitchjindra413/FullStack-Project" target="_blank" rel="noreferrer">Github</a>
                </div>
                <p className='bottom-text'>©{new Date().getFullYear()} TikTokei</p>
            </div>
        </div>
    )
}