import { Modal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux"
import { hideModal } from "../../store/ui"
import { PostView } from "./PostView"

export const PostViewModal = () => {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.ui.postModal)

    return (
        <>
            <Modal onClose={() => dispatch(hideModal())}>
                <PostView postId={modal}></PostView>
            </Modal>
        </>
    )
}