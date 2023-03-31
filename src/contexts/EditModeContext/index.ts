import { createContext, useContext } from "react";

export const EditModeContext = createContext<boolean>(false);
export const useEditModeContext = () => useContext(EditModeContext);
