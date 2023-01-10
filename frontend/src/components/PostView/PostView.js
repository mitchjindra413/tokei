
export const PostView = ({post}) => {

    return (
        <div className="postview-container">
            <video>
                <video className="postview-video" controls loop preload="auto">
                    <source src={post.videoUrl} type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
            </video>
        </div>
    )
}