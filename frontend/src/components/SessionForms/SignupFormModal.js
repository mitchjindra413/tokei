import { Modal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import SignupForm from "./SignupForm"
import { hideModal } from "../../store/ui"

export const SignupFormModal = () => {
    const dispatch = useDispatch()

    return (
        <>
            <Modal onClose={() => dispatch(hideModal())}>
                <SignupForm></SignupForm>
            </Modal>
        </>
    )
}