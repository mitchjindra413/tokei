import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { UserSnipit} from './UserSnipit/UserSnipit'
import './Sidebar.css'

export const Sidebar = () => {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const {topic} = useParams()

    const getFollowing = (state) => {
        return state.session.user && state.session.user.following ? Object.values(state.session.user.following) : []
    }
    const following = useSelector(getFollowing)

    

    return (
        <div className="sidebar-container">
            <div className='spacing-div'>
                <div className="feed-div">
                    <div className="feed-selector" onClick={() => history.push('/')}>
                        <i className="fa-solid fa-house fa-xl" style={!topic ? { color: '#FE2C55' } : {}}></i>
                        <h2 style={!topic ? { color: '#FE2C55' } : {}}>For You</h2>
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
                    <div className="feed-selector" onClick={() => history.push('/topics/comedy')}>
                        <i className="fa-solid fa-face-laugh-beam fa-xl" style={topic === 'comedy' ? { color: '#FE2C55' } : {}}></i>
                        <h2 style={topic === 'comedy' ? { color: '#FE2C55' } : {}}>Comedy</h2>
                    </div>
                    <div className="feed-selector" onClick={() => history.push('/topics/dance')}>
                        <i className="fa-solid fa-compact-disc fa-xl" style={topic === 'dance' ? { color: '#FE2C55' } : {}}></i>
                        <h2 style={topic === 'dance' ? { color: '#FE2C55' } : {}}>Dance</h2>
                    </div>
                    <div className="feed-selector" onClick={() => history.push('/topics/gaming')}>
                        <i className="fa-solid fa-gamepad fa-xl" style={topic === 'gaming' ? { color: '#FE2C55' } : {}}></i>
                        <h2 style={topic === 'gaming' ? { color: '#FE2C55' } : {}}>Gaming</h2>
                    </div>
                </div>
            </div>
            {user && (
            <div className='spacing-div'>
                <div className="feed-div">
                    <h4>Following Accounts</h4>
                    {user.following ? following.map(user => <UserSnipit key={user._id} user={user} ></UserSnipit>) : <p className='no-following'>Accounts you follow will appear here</p>}
                </div>
            </div>)}
            <div className='spacing-div'>
                <div className="feed-div">
                    <h4>Discover</h4>
                    
                </div>
            </div>
            <div className="feed-div">
                <div className='info-div'>
                    <p className='bottom-text'>Connect with the creator:</p>
                    <a className='bottom-text' href="https://www.linkedin.com/in/mitchell-jindra/" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a className='bottom-text' href="https://mitchjindra413.github.io/Portfolio-Website/" target="_blank" rel="noreferrer">Portfolio</a>
                    <a className='bottom-text' href="https://github.com/mitchjindra413/FullStack-Project" target="_blank" rel="noreferrer">Github</a>
                    <a className='bottom-text' href="https://angel.co/u/mitchell-jindra" target="_blank" rel="noreferrer">Wellfound</a>
                </div>
                <div className='info-div'>
                    <p className='bottom-text'>View other works:</p>
                    <a className='bottom-text' href="https://breezebnb.onrender.com/" target="_blank" rel="noreferrer">Breezebnb</a>
                    <a className='bottom-text' href="https://dot-catch.onrender.com/" target="_blank" rel="noreferrer">.Catch</a>
                </div>
                <p className='bottom-text'>©{new Date().getFullYear()} TikTokei</p>
            </div>
        </div>
    )
}