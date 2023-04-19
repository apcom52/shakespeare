import { createContext, useContext } from "react";

interface ShakespeareActionsContext {
  addWidget: (position?: number, widget?: string) => void;
  focusedText: string;
  focusText: (textId: string) => void;
}

export const ShakespeareActionsContext =
  createContext<ShakespeareActionsContext>({
    addWidget: () => null,
    focusedText: "",
    focusText: () => null,
  });
export const useShakespeareActions = () =>
  useContext(ShakespeareActionsContext);
