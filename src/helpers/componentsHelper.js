import {
  dict,
  startOfElement,
  endOfElement,
  commonTextComponent,
  commonTextProperties,
} from './dictionaryComponentHelper';

let components = [];
let properties = [];
let propertiesArray = { properties };

/* Splits full YAIL code into YAIL code for each component*/
function returnFullComponentText(fullText) {
  let fullComponentText = [];
  const text = JSON.stringify(fullText);
  for (let i = 0; i < text.length; i++) {
    if (text.startsWith(startOfElement, i)) {
      fullComponentText.push(text.substring(i).split(endOfElement)[0]);
    }
  }
  return fullComponentText;
}

/* Returns component name */
function getComponentName(text) {
  let componentName = '';
  for (let i = 0; i < text.length; i++) {
    Object.keys(dict).forEach((key) => {
      let componentInfo = commonTextComponent + key;
      if (text.startsWith(componentInfo, i)) {
        componentName = text.substring(i + componentInfo.length).split(' ')[0];
      }
    });
  }
  return componentName;
}

/* Returns an array of components with type and name */
function getAllComponents(text) {
  const allComponents = returnFullComponentText(text);

  for (let i = 0; i < allComponents.length; i++) {
    let componentText = allComponents[i];

    let componentName = getComponentName(componentText);

    Object.keys(dict).forEach((key) => {
      let componentInfoText = commonTextComponent + key;
      for (let j = 0; j < componentText.length; j++) {
        if (componentText.startsWith(componentInfoText, j)) {
          let componentInfo = {
            componentType: dict[key],
            componentName: componentName,
          };
          components = components.concat(componentInfo);
        }
      }
    });
  }
  return components;
}

/* Returns components' properties by name */
function getComponentProperties(text) {
  const allComponents = returnFullComponentText(text);

  for (let i = 0; i < allComponents.length; i++) {
    let componentText = allComponents[i];

    let componentName = getComponentName(componentText);

    let allProperties = {};
    for (let j = 0; j < componentText.length; j++) {
      let propertiesString = componentText
        .substring(j + commonTextProperties.length + componentName.length + 2)
        .split(')\\n\\n')[0];

      if (componentText.startsWith(commonTextProperties, j)) {
        let propertiesName = propertiesString.split(' ')[0];

        let propertiesStringAdjusted = propertiesString.replaceAll('\\"', '');

        let propertiesValue = propertiesStringAdjusted
          .substring(propertiesString.indexOf(' ') + 1)
          .split(" '")[0];

        let propertiesType = propertiesString.substring(
          propertiesString.indexOf(" '") + 2
        );
        allProperties = {
          propertyName: propertiesName,
          propertyValue: propertiesValue,
          propertyType: propertiesType,
        };

        properties.push(allProperties);
      }
    }

    propertiesArray[componentName] = properties;
    properties = [];
    delete propertiesArray.properties;
  }

  return propertiesArray;
}

export { getAllComponents, getComponentProperties };
