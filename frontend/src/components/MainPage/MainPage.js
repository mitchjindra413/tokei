import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../store/posts"
import { Post } from "./Post"

export const MainPage = () => {
    const dispatch = useDispatch()
    const getPosts = (state) => {
        return state.entities.posts ? Object.values(state.entities.posts) : []
    }
    const posts = useSelector(getPosts)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <div className="Main-page-container">
            {posts.map(post => <Post key={post._id} post={post}></Post>)}
        </div>
    )
}