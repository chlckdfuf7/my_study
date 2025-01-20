import { createContext, useContext } from "react";

type DialogContextValue = {
    handleAccept(): void;
    handleClose(): void;
};

export const DialogContext = createContext<DialogContextValue | undefined>(undefined);

const useDialogContext = (): DialogContextValue => {
    const context = useContext(DialogContext);
    if (!context) {
        throw Error('There has no DialogContext');
    }

    return context;
};

export default useDialogContext;