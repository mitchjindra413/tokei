import { useSelector } from "react-redux"

export const Post = ({post}) => {
    const currUser = useSelector(state => state.session.user)
    return (
        <div className="post-container">
            <div className="post-user-info-container">
                <div className="user-info">
                    {/* <img className="profile-pic" src={post.author.profilePicUrl}></img> */}
                    <h3>{}</h3>
                </div>
                <button>Follow</button>
            </div>
            <div className="post-video-container">

            </div>
        </div>
    )
}