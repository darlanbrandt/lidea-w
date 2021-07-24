import { getYAIL } from '../services/yailCode';
import {
  getAllComponents,
  getComponentProperties,
  getScreensInfo,
} from './parser/components/componentsParser';

const getComponents = async () => {
  /* Get YAIL Code */
  const yail = await getYAIL();

  let componentObject = {};
  let components = [];

  const screenInfo = getScreensInfo(yail);

  /* Lists all components in an array */
  const allComponents = getAllComponents(yail);

  /* Lists all components properties in an array */
  const allComponentsProperties = getComponentProperties(yail);

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
  return components;
};

export { getComponents };
