import { useSlideInModalContext } from '../../context/ModalsContext';

const SlideInModal = () => {
  const { close, modalRef, content } = useSlideInModalContext();

  return (
    <dialog
      ref={modalRef}
      className={`rounded-[10px] shadow-md fixed w-full max-w-[500px] h-[90vh]
             top-[10vh] left-1/2 -translate-x-1/2
             translate-y-[90vh] open:translate-y-0
             md:top-0 md:h-screen md:left-auto md:right-0
             md:transform-none md:translate-x-full md:open:translate-x-0
             transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-end">
        <button
          onClick={() => close()}
          className="h-10 w-10 text-body-text text-3xl p-2 m-2 flex items-center justify-center rounded-full hover:bg-neutral-100 absolute "
        >
          &times;
        </button>
      </div>
      {content}
    </dialog>
  );
};

export default SlideInModal;
