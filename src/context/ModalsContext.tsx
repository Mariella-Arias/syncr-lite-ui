import { createContext, ReactNode, RefObject, useContext } from 'react';

export interface IModalContext {
  open: (modalContent: ReactNode) => void;
  close: () => void;
  modalRef: RefObject<HTMLDialogElement>;
  content: ReactNode;
}

export const SlideInModalContext = createContext<IModalContext | undefined>(
  undefined
);

export const useSlideInModalContext = () => {
  const context = useContext(SlideInModalContext);

  if (!context) {
    throw new Error(
      'useSlideInModalContext must be used within a SlideInModalProvider'
    );
  }

  return context;
};

export const CenteredModalContext = createContext<IModalContext | undefined>(
  undefined
);

export const useCenteredModalContext = () => {
  const context = useContext(CenteredModalContext);

  if (!context) {
    throw new Error(
      'useCenteredModalContext must be used within a CenteredModalProvider'
    );
  }

  return context;
};
