import { useRef } from "react"

export const useCreateModal = (className = "") => {
    const modalRef = useRef(null);

    const Modal = ({ children }) => <dialog className={className} ref={modalRef}><div className="resume-modal-content">{children}</div></dialog>;

    const openModal = () => modalRef.current.showModal();
    const closeModal = () => modalRef.current.close();

    return { openModal, closeModal, Modal };
}