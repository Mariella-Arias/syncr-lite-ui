import { createContext, ReactNode, RefObject, useContext } from 'react';

export type ModalType = 'default' | 'slide-in' | null;

export interface IModalContext {
  openModal: (type: ModalType, modalContent: ReactNode) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalRef: RefObject<HTMLDialogElement>;
  modalContent: ReactNode;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};
