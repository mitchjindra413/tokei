import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../store/posts"
import { Sidebar } from "../Sidebar/Sidebar"
import { Post } from "./Post"
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
import './MainPage.css'
import { useParams } from "react-router-dom"
import { PostViewModal } from "../PostView/PostViewModal"

export const MainPage = () => {
    const dispatch = useDispatch()
    const top = useRef(null)
    const getPosts = (state) => {
        return state.entities.posts ? Object.values(state.entities.posts) : []
    }
    const posts = useSelector(getPosts)
    const user = useSelector(state => state.session.user)
    const {topic} = useParams()

    const modal = useSelector(state => state.ui.postModal)

    useEffect(() => {
        if(user){
            const userId = user._id
            dispatch(fetchPosts({topic, userId}))
        } else {
            dispatch(fetchPosts({ topic }))
        }
    }, [topic, user])

    return (
        <>
            {modal && <PostViewModal></PostViewModal>}
            <div className="main-page-container">
                <Sidebar></Sidebar>
                <div className="feed-container" >
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="scroll-up"><BsFillArrowUpCircleFill size={30}/></button>
                    {posts.map(post => <Post key={post._id} post={post}></Post>)}
                </div>
            </div>
        </>
    )
}