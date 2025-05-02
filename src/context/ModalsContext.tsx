// React Imports
import { createContext, ReactNode, RefObject, useContext } from 'react';

/**
 * Modal Context Interface
 *
 * Defines the shape of both modal contexts with common modal functionality
 */
export interface IModalContext {
  open: (modalContent: ReactNode) => void;
  close: () => void;
  modalRef: RefObject<HTMLDialogElement>;
  content: ReactNode;
}

/**
 * Slide-In Modal Context
 *
 * Context for managing modals that slide in from the edge of the screen
 */
export const SlideInModalContext = createContext<IModalContext | undefined>(
  undefined
);

/**
 * Slide-In Modal Hook
 *
 * Custom hook that provides access to the slide-in modal context
 * with error handling for usage outside provider
 *
 * @returns The slide-in modal context
 * @throws Error if used outside of SlideInModalProvider
 */
export const useSlideInModalContext = () => {
  const context = useContext(SlideInModalContext);

  if (!context) {
    throw new Error(
      'useSlideInModalContext must be used within a SlideInModalProvider'
    );
  }

  return context;
};

/**
 * Centered Modal Context
 *
 * Context for managing modals that appear centered in the viewport
 */
export const CenteredModalContext = createContext<IModalContext | undefined>(
  undefined
);

/**
 * Centered Modal Hook
 *
 * Custom hook that provides access to the centered modal context
 * with error handling for usage outside provider
 *
 * @returns The centered modal context
 * @throws Error if used outside of CenteredModalProvider
 */
export const useCenteredModalContext = () => {
  const context = useContext(CenteredModalContext);

  if (!context) {
    throw new Error(
      'useCenteredModalContext must be used within a CenteredModalProvider'
    );
  }

  return context;
};
