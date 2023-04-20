import { createContext, useContext } from "react";

export const ContainerPositionContext = createContext<number>(0);
export const useContainerPositionContext = () =>
  useContext(ContainerPositionContext);
