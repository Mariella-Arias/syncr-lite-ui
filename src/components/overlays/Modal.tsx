import { ReactNode } from 'react';
import { useModalContext } from '../../context/ModalContext';

const Modal = ({ children }: { children: ReactNode }) => {
  const { modalRef } = useModalContext();

  return (
    <dialog
      id="modal"
      ref={modalRef}
      className="p-2 rounded-[10px] shadow-md fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="p-2">{children}</div>
    </dialog>
  );
};

export default Modal;
