import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../store/posts"
import { Sidebar } from "../Sidebar/Sidebar"
import { Post } from "./Post"

import './MainPage.css'

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
        <div className="main-page-container">
            <Sidebar></Sidebar>
            <div className="feed-container">
                {posts.map(post => <Post key={post._id} post={post}></Post>)}
            </div>
        </div>
    )
}