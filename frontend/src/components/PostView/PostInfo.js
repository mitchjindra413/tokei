import { useDispatch, useSelector } from "react-redux"
import { unfollowUser, followUser } from "../../store/user"
import { IoIosMusicalNotes } from "react-icons/io"
import "./PostInfo.css"

export const PostInfo = ({postId}) => {
    const post = useSelector(state => state.entities.posts[postId])
    const currUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const followUnfollow = () => {
        if (currUser.following[post.author._id]) {
            return <button className="follow-button" onClick={() => dispatch(unfollowUser(post.author._id))}>Following</button>
        }
        return <button className="follow-button" onClick={() => dispatch(followUser(post.author._id))}>Follow</button>
    }

    const handelClick = () => {

    }

    return (
        <div className="post-info-view">
            <div className="info-top">
                <div className="user-profile">
                    <img className="profile-pic-info" src={post.author.profilePhoto}></img>            
                    <h3 className="profile-username">{post.author.username}</h3>
                </div>
                {followUnfollow()}
            </div>
            <p className="post-caption">{post.caption}</p>
            <div className="sound-container">
                <IoIosMusicalNotes size={18} />
                <p>{post.sound}</p>
            </div>
            <div className="likes-comments-view-container">
                <div className="likes-comments-view" onClick={handelClick}>
                    <i className="fa-solid fa-heart fa-l"></i>
                    <p>{post.likes.length}</p>
                </div>
                <div className="likes-comments-view">
                    <i className="fa-solid fa-comment-dots fa-l"></i>
                    <p>0</p>
                </div>
            </div>
            <div className="copy-container">
                
            </div>
        </div>
    )
}