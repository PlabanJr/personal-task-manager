import { EAuthForm } from "@/core/enums/app";
import { useState } from "react";

const useTaskModal = (() => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        onClose,
        onOpen
    }
});

export default useTaskModal;
