import React, { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from 'react';

const AutoCompleteContext = createContext({} as IAutoCompleteContext);

export const AutoCompleteProvider: React.FC = ({ children }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [suggestions, setSuggestions] = useState<any[]>([]);

  const [valueInput, setValueInput] = useState('');

  const [currentSelected, setCurrentSelected] = useState(null);

  const [activeItem, setActiveItem] = useState(0);

  const value = useMemo<IAutoCompleteContext>(
    () => ({
      state: {
        showSuggestions,
        suggestions,
        valueInput,
        currentSelected,
        activeItem,
      },
      actions: {
        setShowSuggestions,
        setSuggestions,
        setValueInput,
        setCurrentSelected,
        setActiveItem,
      },
    }),
    [showSuggestions, setShowSuggestions, suggestions, valueInput, currentSelected, activeItem]
  );

  return <AutoCompleteContext.Provider value={value}>{children}</AutoCompleteContext.Provider>;
};

export const useAutoComplete = () => {
  return useContext(AutoCompleteContext);
};

export interface IAutoCompleteState {
  showSuggestions: boolean;
  suggestions: any[];
  valueInput: string;
  currentSelected: any;
  activeItem: number;
}

export interface IAutoCompleteActions {
  setShowSuggestions: Dispatch<SetStateAction<boolean>>;
  setSuggestions: Dispatch<SetStateAction<any[]>>;
  setValueInput: Dispatch<SetStateAction<string>>;
  setCurrentSelected: Dispatch<SetStateAction<any>>;
  setActiveItem: Dispatch<SetStateAction<number>>;
}

export interface IAutoCompleteContext {
  state: IAutoCompleteState;
  actions: IAutoCompleteActions;
}
