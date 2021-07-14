import React, { useEffect, useState, createContext } from 'react';
import api from '../services/api';
import {
  getAllComponents,
  getComponentProperties,
} from '../helpers/componentsHelper';

const ComponentContext = createContext();

export function ComponentProvider({ children }) {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const getPageComponents = async () => {
      const res = await api.get('/data');
      const code = await res.data;

      let componentObject = {};
      let components = [];

      const allComponents = getAllComponents(code);
      const allComponentsProperties = getComponentProperties(code);

      Object.keys(allComponents).forEach((acKey) => {
        let cValue = allComponents[acKey];
        Object.keys(allComponentsProperties).forEach((cKey) => {
          let componentProperty = allComponentsProperties[cKey];

          if (cValue.componentName === cKey) {
            componentObject = {
              componentType: cValue.componentType,
              componentName: cValue.componentName,
              componentProperies: componentProperty,
            };
            components = components.concat(componentObject);
          }
        });
      });
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
