import { createContext, RefObject, useContext } from 'react';

interface IModalContext {
  openModal: () => void;
  closeModal: () => void;
  modalRef: RefObject<HTMLDialogElement>;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};
