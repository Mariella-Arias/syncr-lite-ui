// React Imports
import { ReactNode, useRef, useState } from 'react';

// Context
import { CenteredModalContext, SlideInModalContext } from './ModalsContext';

/**
 * ModalsProvider Component
 *
 * Context provider that manages both slide-in and centered modals
 * throughout the application.
 *
 * @param {ReactNode} props.children Child components that will have access to modal contexts
 * @returns Context provider for application modals
 */
export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  // === Slide-In Modal State and Refs ===
  const slideInModalRef = useRef<HTMLDialogElement>(null);
  const [slideInContent, setSlideInContent] = useState<ReactNode>(null);

  /**
   * Opens the slide-in modal with provided content
   *
   * @param content React component or elements to display in the modal
   */
  const openSlideInModal = (content: ReactNode) => {
    slideInModalRef.current?.showModal();
    setSlideInContent(content);
  };

  /**
   * Closes the slide-in modal and clears its content
   */
  const closeSlideInModal = () => {
    slideInModalRef.current?.close();
    setSlideInContent(null);
  };

  // === Centered Modal State and Refs ===
  const centeredModalRef = useRef<HTMLDialogElement>(null);
  const [centeredContent, setCenteredContent] = useState<ReactNode>(null);

  /**
   * Opens the centered modal with provided content
   *
   * @param content React component or elements to display in the modal
   */
  const openCenteredModal = (content: ReactNode) => {
    centeredModalRef.current?.showModal();
    setCenteredContent(content);
  };

  /**
   * Closes the centered modal and clears its content
   */
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
