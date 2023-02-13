import { useDispatch, useSelector } from "react-redux"
import { unfollowUser, followUser } from "../../store/user"
import { IoIosMusicalNotes } from "react-icons/io"

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
        <div>
            <div className="">
                <div className="">
                    <img className="profile-pic" src=''></img>
                    
                    <h3 className="profile-username">{post.author.username}</h3>
                </div>
                {followUnfollow()}
            </div>
            <p className="post-caption">{post.caption}</p>
            <div className="sound-container">
                <IoIosMusicalNotes size={18} />
                <p>{post.sound}</p>
            </div>
            <div className="post-interaction-buttons">

                <button onClick={handelClick}><i className="fa-solid fa-heart fa-xl"></i></button>
                <p>{post.likes.length}</p>

                <button><i className="fa-solid fa-comment-dots fa-xl"></i></button>
                {/* <p>{post.comments.length}</p> */}
            </div>
        </div>
    )
}