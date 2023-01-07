import { useSelector } from "react-redux"
import './Post.css'

export const Post = ({post}) => {
    // const currUser = useSelector(state => state.session.user)
    return (
        <div className="post-container">
            <div className="post-user-info-container">
                <div className="user-info">
                    <img className="profile-pic" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc56o27DhJ89wqj4Oyt9kdJ8eqtEmYJ6PTI4Mmc-3-Kw&s'></img>
                    <div className="post-info">
                        <h3 className="profile-username">{post.author.username}</h3>
                        <p className="post-caption">{post.caption}</p>
                    </div>
                </div>
                <button className="follow-button">Follow</button>
            </div>
            <div className="post-video-container">
                <video className="post-video" controls loop preload="auto">
                    <source src={post.videoUrl} type="video/mp4"></source>
                </video>
                <div className="post-interaction-buttons">
                    
                    <button><i class="fa-solid fa-heart fa-xl"></i></button>
                    <p>{post.likes.length}</p>
                
                    <button><i class="fa-solid fa-comment-dots fa-xl"></i></button>
                    <p>{post.comments.length}</p>
                    
                </div>
            </div>
        </div>
    )
}