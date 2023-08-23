import { EAuthForm } from "@/core/enums/app";
import { useState } from "react";

const useAuthModal = (() => {
    const [type, setType] = useState<EAuthForm | null>(null);

    const onOpen = (type: EAuthForm) => {
        setType(type)
    }

    const onClose = () => {
        setType(null)
    }

    return {
        type,
        onClose,
        onOpen
    }
});

export default useAuthModal;
