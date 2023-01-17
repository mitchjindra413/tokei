import { useDispatch, useSelector } from "react-redux"
import './Post.css'
import { showLoginModal } from "../../store/ui"
import { IoIosMusicalNotes } from "react-icons/io"
import { followUser, unfollowUser } from "../../store/user"

export const Post = ({post}) => {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.session.user)

    const handelClick = () => {
        if (!currUser) return dispatch(showLoginModal())
    }


    const followUnfollow = () => {
        if(!currUser) {
            return <button className="follow-button" onClick={() => dispatch(showLoginModal())}>Follow</button>
        }
        if(currUser.following[post.author._id]) {
            return  <button className="follow-button" onClick={() => dispatch(unfollowUser(post.author._id))}>Following</button>
        }
        return <button className="follow-button" onClick={() => dispatch(followUser(post.author._id))}>Follow</button>
    }

    return (
        <div className="post-container">
            <div className="post-user-info-container">
                <div className="user-info">
                    <img className="profile-pic" src='https://tokei-seed.s3.us-west-1.amazonaws.com/assets/blank.jpg'></img>
                    <div className="post-info">
                        <h3 className="profile-username">{post.author.username}</h3>
                        <p className="post-caption">{post.caption}</p>
                        <div className="sound-container"> 
                            <IoIosMusicalNotes size={18}/>
                            <p>{post.sound}</p>
                        </div>
                    </div>
                </div>
                {followUnfollow()}
            </div>
            <div className="post-video-container">
                <video className="post-video" controls loop preload="auto" style={{ zIndex: 1 }}>
                    <source src={post.videoUrl} type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
                <div className="post-interaction-buttons">
                    
                    <button onClick={handelClick}><i className="fa-solid fa-heart fa-xl"></i></button>
                    <p>{post.likes.length}</p>
                
                    <button onClick={handelClick}><i className="fa-solid fa-comment-dots fa-xl"></i></button>
                    <p>{post.comments.length}</p>
                    
                </div>
            </div>
        </div>
    )
}