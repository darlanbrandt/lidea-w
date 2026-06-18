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
  const [isConnected, setIsConnected] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [screenName, setScreenName] = useState('');

  useEffect(() => {
    if (phoneLoading && components.length > 0) {
      setPhoneLoading(false);
    }
  }, [components, phoneLoading]);

  function connect() {
    setIsConnected(true);
    setPhoneLoading(true);
  }

  function reset() {
    setIsConnected(false);
    setPhoneLoading(false);
    setComponents([]);
    setBlocks([]);
    setYail({});
    setScreenName('');
    setPaused(false);
  }

  useEffect(() => {
    const updateYAIL = async () => {
      try {
        const latestYail = await getYAIL();
        if (latestYail) {
          setYail(latestYail);
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[LIDEA-w] Erro ao atualizar YAIL:', err.message);
        }
      }
    };

    if (!paused) {
      const timerId = setInterval(updateYAIL, 2000);
      return () => clearInterval(timerId);
    }
  }, [paused]);

  useEffect(() => {
    const getPageComponents = async () => {
      try {
        const { components: comps, screenName: name } = await getComponents(yail);
        const blks = await getBlocks(yail);
        setComponents(comps);
        setBlocks(blks);
        if (name) setScreenName(name);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[LIDEA-w] Erro ao processar YAIL:', err.message);
        }
      }
    };

    getPageComponents();
  }, [yail]);

  return (
    <ContentContext.Provider value={{
      components, blocks, screenName,
      isConnected, phoneLoading,
      connect, reset,
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentContext;
