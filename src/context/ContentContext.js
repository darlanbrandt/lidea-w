import React, { useEffect, useState, createContext } from 'react';

import { getComponents } from '../helpers/componentsHelper';
import { getBlocks } from '../helpers/blocksHelper';
import { getYAIL } from '../services/yailCode';

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [components, setComponents] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [yail, setYail] = useState({});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const updateYAIL = async () => {
      const latestYail = await getYAIL();

      if (latestYail) {
        console.log(`latest yail: ${latestYail}`);
        setYail(latestYail);
        // adicionado para não ficar enviando requests para o servidor. para retormar, remover linha abaixo
        /*setTimeout(setPaused(true), 500);
        console.log(paused);*/
      }
    };

    //comando que envia solicitações ao servidor de alguma alteração no código, recebendo atualizações de código YAIL
    if (!paused) {
      const timerId = setInterval(updateYAIL, 10000);

      return () => clearInterval(timerId);
    }
  }, [paused]);

  //console.log(yail);

  useEffect(() => {
    setComponents([]);
    const getPageComponents = async () => {
      const components = await getComponents(yail);
      const blocks = await getBlocks(yail);
      setComponents(components);
      setBlocks(blocks);
    };

    getPageComponents();
  }, [yail]);

  return (
    <ContentContext.Provider value={{ components, blocks }}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentContext;
