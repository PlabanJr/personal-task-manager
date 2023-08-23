import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  onCloseModal: (...args: any) => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onCloseModal,
}) => {
  const onClickOverlay = (e: any) => {
    const targetId = e?.target?.id;
    if (targetId === "overlay") onCloseModal();
  };

  return createPortal(
    <div>
      <div
        id="overlay"
        className="bg-white/20 backdrop-blur-sm fixed inset-0"
        onClick={onClickOverlay}
      />
      <div className="fixed drop-shadow-md border border-black top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-[25px] focus:outline-none">
        <h1 className="text-xl text-center font-bold mb-4">
          {title}
        </h1>
        <div>{children}</div>
        <div>
          <button
            className="text-neutral-400 hover:text-black absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none"
            onClick={onCloseModal}
          >
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
