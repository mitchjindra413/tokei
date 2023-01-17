import { useHistory } from 'react-router-dom'
import './UserSnipit.css'

export const UserSnipit = ({user}) => {
    const history = useHistory()

    return (
        <div className="user-snipit-container" onClick={() => history.push(`/${user.username}`)}>
            <img className="profile-pic " src={user.profilePic ? user.profilePic : 'https://tokei-seed.s3.us-west-1.amazonaws.com/assets/blank.jpg'}></img>
            <h2 className="user-snipit-username">{user.username}</h2>
        </div>
    )
}