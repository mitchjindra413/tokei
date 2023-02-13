import { useDispatch, useSelector } from "react-redux"
import { hideModal } from "../../store/ui"
import { PostInfo } from "./PostInfo"
import './PostView.css'

export const PostView = ({postId}) => {
    
    const post = useSelector(state => state.entities.posts[postId])
    const dispatch = useDispatch()


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
                <PostInfo postId={postId}></PostInfo>
            </div>
        </div>
    )
}