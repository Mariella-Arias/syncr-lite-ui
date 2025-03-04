import { useCenteredModalContext } from '../../context/ModalsContext';

const CenteredModal = () => {
  const { close, modalRef, content } = useCenteredModalContext();

  return (
    <dialog
      ref={modalRef}
      className="rounded-[10px] shadow-md fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex justify-end">
        <button
          onClick={() => close()}
          className="h-10 w-10 text-body-text text-3xl p-2 m-2 flex items-center justify-center rounded-full hover:bg-neutral-100 absolute"
        >
          &times;
        </button>
      </div>
      {content}
    </dialog>
  );
};

export default CenteredModal;
