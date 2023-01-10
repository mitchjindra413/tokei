import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../store/posts"
import { Sidebar } from "../Sidebar/Sidebar"
import { Post } from "./Post"
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
import './MainPage.css'
import { useParams } from "react-router-dom"

export const MainPage = () => {
    const dispatch = useDispatch()
    const top = useRef(null)
    const getPosts = (state) => {
        return state.entities.posts ? Object.values(state.entities.posts) : []
    }
    const posts = useSelector(getPosts)
    const [scroll, toggleScroll] = useState(false)
    const {topic} = useParams()

    useEffect(() => {
        dispatch(fetchPosts({topic}))
    }, [topic])

    return (
        <div className="main-page-container">
            <Sidebar></Sidebar>
            <div className="feed-container" >
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="scroll-up"><BsFillArrowUpCircleFill size={30}/></button>
                {posts.map(post => <Post key={post._id} post={post}></Post>)}
            </div>
        </div>
    )
}