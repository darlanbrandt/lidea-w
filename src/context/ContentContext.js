import React, { useEffect, useState, createContext } from 'react';

import { getComponents } from '../helpers/componentsHelper';
import { getBlocks } from '../helpers/blocksHelper';

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [components, setComponents] = useState([]);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const getPageComponents = async () => {
      const components = await getComponents();
      const blocks = await getBlocks();
      setComponents(components);
      setBlocks(blocks);
    };

    getPageComponents();
  }, []);

  return (
    <ContentContext.Provider value={{ components, blocks }}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentContext;
