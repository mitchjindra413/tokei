import { Modal } from "../../context/Modal"
import LoginForm from "./LoginForm"
import { useDispatch } from "react-redux"

export const LoginFormModal = () => {
    const dispatch = useDispatch()

    return (
        <>
            <Modal onClose={() => dispatch(hideModal())}>
                <LoginForm></LoginForm>
            </Modal>
        </>
    )
}