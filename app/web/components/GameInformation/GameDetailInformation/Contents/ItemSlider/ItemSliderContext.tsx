import React, {
  createContext,
  useContext,
} from 'react';

const Context = createContext(undefined);

export const ItemSliderProvider = ({ children, value }: {children: any; value: any}) => (
  <Context.Provider
    value={value}
  >
    {children}
  </Context.Provider>
);

export const useItemSliderContext = () => useContext(Context);
