import { ReactNode } from 'react';

import { ModalContext } from './ModalContext';
import { useModal } from '../hooks/useModal';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const modal = useModal();

  return (
    <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
  );
};
