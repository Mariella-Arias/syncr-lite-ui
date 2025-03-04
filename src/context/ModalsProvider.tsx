import { ReactNode, useRef, useState } from 'react';

import { CenteredModalContext, SlideInModalContext } from './ModalsContext';

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const slideInModalRef = useRef<HTMLDialogElement>(null);
  const [slideInContent, setSlideInContent] = useState<ReactNode>(null);

  const openSlideInModal = (content: ReactNode) => {
    slideInModalRef.current?.showModal();
    setSlideInContent(content);
  };

  const closeSlideInModal = () => {
    slideInModalRef.current?.close();
    setSlideInContent(null);
  };

  const centeredModalRef = useRef<HTMLDialogElement>(null);
  const [centeredContent, setCenteredContent] = useState<ReactNode>(null);

  const openCenteredModal = (content: ReactNode) => {
    centeredModalRef.current?.showModal();
    setCenteredContent(content);
  };

  const closeCenteredModal = () => {
    centeredModalRef.current?.close();
    setCenteredContent(null);
  };

  return (
    <SlideInModalContext.Provider
      value={{
        open: openSlideInModal,
        close: closeSlideInModal,
        modalRef: slideInModalRef,
        content: slideInContent,
      }}
    >
      <CenteredModalContext.Provider
        value={{
          open: openCenteredModal,
          close: closeCenteredModal,
          modalRef: centeredModalRef,
          content: centeredContent,
        }}
      >
        {children}
      </CenteredModalContext.Provider>
    </SlideInModalContext.Provider>
  );
};
