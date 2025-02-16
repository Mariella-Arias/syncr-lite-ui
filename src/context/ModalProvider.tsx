import { ReactNode, useRef, useState } from 'react';

import { ModalContext, ModalType } from './ModalContext';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const openModal = (type: ModalType, content: ReactNode) => {
    modalRef.current?.showModal();
    setModalContent(content);

    if (type) {
      setModalType(type);
    } else {
      setModalType(null);
    }
  };
  const closeModal = () => {
    modalRef.current?.close();
    setModalType(null);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, modalRef, modalType, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};
