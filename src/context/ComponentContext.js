import React, { useEffect, useState, createContext } from 'react';

import { getComponents } from '../helpers/componentsHelper';
import { getBlocks } from '../helpers/blocksHelper';

const ComponentContext = createContext();

export function ComponentProvider({ children }) {
  const [components, setComponents] = useState([]);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const getPageComponents = async () => {
      const components = await getComponents();
      const blocks = await getBlocks();
      console.log(blocks);
      console.log(components);
      setComponents(components);
    };

    getPageComponents();
  }, []);

  return (
    <ComponentContext.Provider value={{ components, setComponents }}>
      {children}
    </ComponentContext.Provider>
  );
}

export default ComponentContext;
