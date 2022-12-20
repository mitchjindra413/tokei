import { Modal } from "../../context/Modal"
import LoginForm from "./LoginForm"
import { useDispatch, useSelector } from "react-redux"
import { hideModal } from "../../store/ui"
import SignupForm from "./SignupForm"

export const SessionModal = () => {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.ui.modal)

    return (
        <>
            <Modal onClose={() => dispatch(hideModal())}>
                {modal === 'login' ? <LoginForm></LoginForm> : <SignupForm></SignupForm>}
            </Modal>
        </>
    )
}