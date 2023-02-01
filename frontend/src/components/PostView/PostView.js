import { useDispatch, useSelector } from "react-redux"
import { UserSnipit } from "../Sidebar/UserSnipit/UserSnipit"
import { hideModal } from "../../store/ui"
import { unfollowUser, followUser } from "../../store/user"
import './PostView.css'

export const PostView = ({postId}) => {
    const currUser = useSelector(state => state.session.user)
    const post = useSelector(state => state.entities.posts[postId])
    const dispatch = useDispatch()

    const followUnfollow = () => {
        if (currUser.following[post.author._id]) {
            return <button className="follow-button" onClick={() => dispatch(unfollowUser(post.author._id))}>Following</button>
        }
        return <button className="follow-button" onClick={() => dispatch(followUser(post.author._id))}>Follow</button>
    }

    return (
        <div className="postview-container">
            <div className="left-postview">
                <button className="exit-postview" onClick={() => dispatch(hideModal())}><i style={{color: 'white'}} className="fa-solid fa-x"></i></button>
                <video className="postview-video" controls loop preload="auto">
                    <source src={post.videoUrl} type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="right-postview">
                <UserSnipit user={post.author}/>
                {followUnfollow()}
            </div>
        </div>
    )
}