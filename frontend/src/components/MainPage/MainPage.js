import { useSelector } from "react-redux"

export const MainPage = () => {
    const getPosts = (state) => {
        return state.entities.posts ? Object.values(state.entities.listings) : []
    }
    // const posts = useSelector(getPosts)
    return (
        <div>

        </div>
    )
}