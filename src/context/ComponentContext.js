import React, { useEffect, useState, createContext } from 'react';
import api from '../services/api';
import {
  getAllComponents,
  getComponentProperties,
  getScreensInfo,
} from '../helpers/componentsHelper';

const ComponentContext = createContext();

export function ComponentProvider({ children }) {
  const [components, setComponents] = useState([]);
  //const [screenInfo, setScreenInfo] = useState([]);


  useEffect(() => {
    const getPageComponents = async () => {
      /* Fetch data from API */
      const res = await api.get('/data');
      const code = await res.data;
      const screenInfo = getScreensInfo(code);
      console.log(Math.floor(Math.random() * 10000) + 1);

      let componentObject = {};
      let components = [];

      /* Lists all components in an array */
      const allComponents = getAllComponents(code);

      /* Lists all components properties in an array */
      const allComponentsProperties = getComponentProperties(code);

      /* Merges both arrays into a new object */
      Object.keys(allComponents).forEach((acKey) => {
        let cValue = allComponents[acKey];

        let parentIsScreen = false;
        Object.keys(screenInfo).forEach((sKey) => {
          if (cValue.parentComponent === sKey) {
            parentIsScreen = true;
          }
        });

        Object.keys(allComponentsProperties).forEach((cKey) => {
          let componentProperty = allComponentsProperties[cKey];

          if (cValue.componentName === cKey) {
            componentObject = {
              componentType: cValue.componentType,
              componentName: cValue.componentName,
              componentProperties: componentProperty,
              parentComponent: cValue.parentComponent,
              parentIsScreen: parentIsScreen,
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
