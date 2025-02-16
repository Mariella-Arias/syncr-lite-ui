import { useModalContext } from '../../context/ModalContext';

const Modal = () => {
  const { modalRef, modalType, modalContent, closeModal } = useModalContext();

  return (
    <dialog
      id="modal"
      ref={modalRef}
      className={`p-2 rounded-[10px] shadow-md ${
        modalType === 'slide-in'
          ? 'fixed top-0 right-0 h-full w-1/3 transform translate-x-full transition-transform duration-300 open:translate-x-0'
          : 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
      }`}
    >
      <div className="p-2">
        <div className="flex justify-end">
          <button
            onClick={() => closeModal()}
            className="h-10 w-10 text-body-text text-2xl p-2 flex items-center justify-center rounded-full"
          >
            &times;
          </button>
        </div>
        {modalContent}
      </div>
    </dialog>
  );
};

export default Modal;
