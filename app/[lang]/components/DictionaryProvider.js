'use client';

import { createContext, useContext } from 'react';

const DictionaryContext = createContext(null);

export function DictionaryProvider({ dictionary, children }) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  return useContext(DictionaryContext);
}
