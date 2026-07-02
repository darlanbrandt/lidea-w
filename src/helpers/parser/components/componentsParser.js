import {
  dict,
  startOfElement,
  endOfElement,
  commonTextComponent,
  commonTextProperties,
  commonTextScreenTitle,
  screenTextProperties,
} from './componentsParserDictionary';

let components = [];
let properties = [];
let screenProperties = [];

function getScreensInfo(fullText) {
  if (fullText == null) return {};
  let screenTitleText = '';
  let screenName = '';
  screenProperties = [];
  const text = JSON.stringify(fullText);
  for (let i = 0; i < text.length; i++) {
    if (text.startsWith(commonTextScreenTitle, i)) {
      screenTitleText = text.substring(i).split(startOfElement)[0];
    }
  }
  screenName = screenTitleText.substring(commonTextScreenTitle.length).split(' ')[0];

  let screenProperty = [];
  for (let j = 0; j < screenTitleText.length; j++) {
    if (screenTitleText.startsWith(screenTextProperties, j)) {
      screenProperty.push(screenTitleText.substring(j).split(')\\n ')[0]);
    }
  }
  let allScreenProperties = {};
  screenProperty.forEach((screenProperty) => {
    let screenInfoText = screenProperty;
    let screenInfo = screenTextProperties + screenName;
    let propertiesString = screenInfoText.substring(screenInfo.length + 2).split(')\\n')[0];
    if (screenInfoText.startsWith(screenInfo)) {
      let propertiesName = propertiesString.split(' ')[0];
      let propertiesStringAdjusted = propertiesString.replaceAll('\\"', '');
      let propertiesValue = propertiesStringAdjusted
        .substring(propertiesString.indexOf(' ') + 1)
        .split(" '")[0];
      let propertiesType = propertiesString.substring(propertiesString.indexOf(" '") + 2);
      allScreenProperties = { propertyName: propertiesName, propertyValue: propertiesValue, propertyType: propertiesType };
      screenProperties.push(allScreenProperties);
    }
  });

  const screenPropertiesArray = {};
  screenPropertiesArray[screenName] = screenProperties;
  screenProperties = [];
  return screenPropertiesArray;
}

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

function getComponentName(text) {
  let componentName = '';
  for (let i = 0; i < text.length; i++) {
    Object.keys(dict).forEach((key) => {
      const componentInfo = commonTextComponent + key;
      if (text.startsWith(componentInfo, i)) {
        componentName = text.substring(i + componentInfo.length).split(' ')[0];
      }
    });
  }
  return componentName;
}

function getAllComponents(text) {
  if (text == null) return {};
  const allComponents = returnFullComponentText(text);
  components = [];
  allComponents.forEach((allComponent) => {
    let componentText = allComponent;
    let componentName = getComponentName(componentText);
    Object.keys(dict).forEach((key) => {
      let componentInfoText = commonTextComponent + key;
      for (let j = 0; j < componentText.length; j++) {
        if (componentText.startsWith(componentInfoText, j)) {
          let parentComponent = componentText.substring(startOfElement.length + 1).split(' ')[0];
          components = components.concat({ componentType: dict[key], componentName, parentComponent });
        }
      }
    });
  });
  return components;
}

function getComponentProperties(text) {
  if (text == null) return {};
  let propertiesArray = {};
  const allComponents = returnFullComponentText(text);
  allComponents.forEach((allComponent) => {
    let componentText = allComponent;
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
        let propertiesType = propertiesString.substring(propertiesString.indexOf(" '") + 2);
        allProperties = { propertyName: propertiesName, propertyValue: propertiesValue, propertyType: propertiesType };
        properties.push(allProperties);
      }
    }
    propertiesArray[componentName] = properties;
    properties = [];
  });
  return propertiesArray;
}

export { getAllComponents, getComponentProperties, getScreensInfo };
