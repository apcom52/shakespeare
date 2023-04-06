import { createContext, useContext } from "react";

interface ShakespeareActionsContext {
  addWidget: (position?: number, widget?: string) => void;
}

export const ShakespeareActionsContext =
  createContext<ShakespeareActionsContext>({
    addWidget: () => null,
  });
export const useShakespeareActions = () =>
  useContext(ShakespeareActionsContext);
