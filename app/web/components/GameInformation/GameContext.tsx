import React, {
  createContext,
  useContext,
} from 'react';
import { Game } from 'web/model/game';

const Context = createContext(undefined);

export const GameProvider = ({ children, value }: {children: any; value: Game}) => (
  <Context.Provider
    value={value}
  >
    {children}
  </Context.Provider>
);

export const useGameInformationContext = () => useContext(Context);
