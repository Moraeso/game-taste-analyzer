import React, {
  createContext,
  useContext,
} from 'react';
import { SimpleGame } from 'web/model/game';

const Context = createContext(undefined);

export const SimilarGamesProvider = ({ children, value }: {children: any; value: SimpleGame[]}) => (
  <Context.Provider
    value={value}
  >
    {children}
  </Context.Provider>
);

export const useSimilarGamesContext = () => useContext(Context);
