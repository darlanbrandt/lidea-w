import {
  measureValue,
  alignHorizontalValue,
  alignVerticalValue,
  fontSizeValue,
  textAlignmentValue,
  fontTypefaceValue,
  shapeValue,
} from '../../../helpers/propertiesHelper';

// Retorna o texto do componente
const defaultTextValue = (componentProperties) => {
  let textValue = <>&nbsp;</>;

  const componentTextValue = componentProperties.find(
    (prop) => prop.propertyName === 'Text'
  );

  if (componentTextValue !== undefined) {
    textValue = componentTextValue.propertyValue;
  } else {
    textValue = '';
  }
  return textValue;
};

// Retorna o valor do placeholder do componente
const defaultHintValue = (componentProperties) => {
  let hintValue = <>&nbsp;</>;

  const componentHintValue = componentProperties.find(
    (prop) => prop.propertyName === 'Hint'
  );

  if (componentHintValue !== undefined) {
    hintValue = componentHintValue.propertyValue;
  } else {
    hintValue = '';
  }

  return hintValue;
};

// Retorna a cor de fundo do componente
const defaultBgColorValue = (componentProperties) => {
  let bgColor = '';
  const componentBgColor = componentProperties.find(
    (prop) => prop.propertyName === 'BackgroundColor'
  );

  if (componentBgColor !== undefined) {
    bgColor = componentBgColor.propertyValue.replace('#xFF', '#');
  }
  return bgColor;
};

// Retorna o estado habilitado/desabilitado do componente
const defaultEnablementValue = (componentProperties) => {
  let enabled = '';
  const componentEnabled = componentProperties.find(
    (prop) => prop.propertyName === 'Enabled'
  );

  if (componentEnabled !== undefined) {
    if (componentEnabled.propertyValue === '#f') {
      enabled = false;
    }
  }
  return enabled;
};

// Retorna o tamanho da fonte do texto
const defaultFontSizeValue = (componentProperties) => {
  let fontSize = '14px';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontSize'
  );

  if (componentFontSize !== undefined) {
    fontSize = fontSizeValue(componentFontSize.propertyValue);
  }
  return fontSize;
};

// Retorna se a fonte é Itálico
const defaultFontStyleValue = (componentProperties) => {
  let fontStyle = 'none';
  const componentFontSize = componentProperties.find(
    (prop) => prop.propertyName === 'FontItalic'
  );

  if (componentFontSize !== undefined) {
    if (componentFontSize.propertyValue === '#t') {
      fontStyle = 'italic';
    }
  }
  return fontStyle;
};

// Retorna se a fonte é Negrito
const defaultFontWeightValue = (componentProperties) => {
  let fontWeight = 'normal';
  const componentFontWeight = componentProperties.find(
    (prop) => prop.propertyName === 'FontBold'
  );

  if (componentFontWeight !== undefined) {
    if (componentFontWeight.propertyValue === '#t') {
      fontWeight = 'bold';
    }
  }
  return fontWeight;
};

// Retorna o estilo da fonte (serif/sans-serif/monospace)
const defaultFontTypefaceValue = (componentProperties) => {
  let fontTypeface = 'Roboto';
  const componentFontTypeface = componentProperties.find(
    (prop) => prop.propertyName === 'FontTypeface'
  );

  if (componentFontTypeface !== undefined) {
    fontTypeface = fontTypefaceValue(componentFontTypeface.propertyValue);
  }
  return fontTypeface;
};

// Retorna a cor do texto
const defaultTextColorValue = (componentProperties) => {
  let textColor = 'black';
  const componentTextColor = componentProperties.find(
    (prop) => prop.propertyName === 'TextColor'
  );

  if (componentTextColor !== undefined) {
    textColor = componentTextColor.propertyValue.replace('#xFF', '#');
  }
  return textColor;
};

// Retorna a altura do componente
const defaultHeightValue = (componentProperties) => {
  let height = defaultFontSizeValue(componentProperties);
  const componentHeight = componentProperties.find(
    (prop) => prop.propertyName === 'Height'
  );

  if (componentHeight !== undefined) {
    height = measureValue(componentHeight.propertyValue);
  }
  return height;
};

// Retorna a largura do componente
const defaultWidthValue = (componentProperties) => {
  let width = '25%';
  const componentWidth = componentProperties.find(
    (prop) => prop.propertyName === 'Width'
  );

  if (componentWidth !== undefined) {
    width = measureValue(componentWidth.propertyValue);
  }

  return width;
};

// Retorna o alinhamento do texto do componente
const defaultTextAlignmentValue = (componentProperties) => {
  let textAlignment = '';
  const componentTextAlignment = componentProperties.find(
    (prop) => prop.propertyName === 'TextAlignment'
  );

  if (componentTextAlignment !== undefined) {
    textAlignment = textAlignmentValue(componentTextAlignment.propertyValue);
  }
  return textAlignment;
};

// Retorna a visibilidade do componente
const defaultVisibility = (componentProperties) => {
  let visible = true;
  const componentVisible = componentProperties.find(
    (prop) => prop.propertyName === 'Visible'
  );

  if (componentVisible !== undefined) {
    if (componentVisible.propertyValue === '#f') {
      visible = false;
    }
  }
  return visible;
};

// Retorna o alinhamento horizontal
const defaultAlignHorizontalValue = (componentProperties) => {
  let alignHorizontal = '';
  const componentAlignHorizontal = componentProperties.find(
    (prop) => prop.propertyName === 'AlignHorizontal'
  );

  if (componentAlignHorizontal !== undefined) {
    alignHorizontal = alignHorizontalValue(
      componentAlignHorizontal.propertyValue
    );
  }
  return alignHorizontal;
};

// Retorna o alinhamento vertical
const defaultAlignVerticalValue = (componentProperties) => {
  let alignVertical = '';
  const componentAlignVertical = componentProperties.find(
    (prop) => prop.propertyName === 'AlignVertical'
  );

  if (componentAlignVertical !== undefined) {
    alignVertical = alignVerticalValue(componentAlignVertical.propertyValue);
  }
  return alignVertical;
};

// Retorna o formato do botão
const defaultShapeValue = (componentProperties) => {
  let shape = '';
  const componentShape = componentProperties.find(
    (prop) => prop.propertyName === 'Shape'
  );

  if (componentShape !== undefined) {
    shape = shapeValue(componentShape.propertyValue);
  }

  return shape;
};

const getDefaultProperties = (componentProperties) => {
  const defaultProperties = {
    bgColor: defaultBgColorValue(componentProperties),
    enabled: defaultEnablementValue(componentProperties),
    fontWeight: defaultFontWeightValue(componentProperties),
    fontStyle: defaultFontStyleValue(componentProperties),
    fontSize: defaultFontSizeValue(componentProperties),
    fontTypeface: defaultFontTypefaceValue(componentProperties),
    height: defaultHeightValue(componentProperties),
    width: defaultWidthValue(componentProperties),
    hint: defaultHintValue(componentProperties),
    text: defaultTextValue(componentProperties),
    textAlignment: defaultTextAlignmentValue(componentProperties),
    textColor: defaultTextColorValue(componentProperties),
    visible: defaultVisibility(componentProperties),
    alignHorizontal: defaultAlignHorizontalValue(componentProperties),
    alignVertical: defaultAlignVerticalValue(componentProperties),
    shape: defaultShapeValue(componentProperties),
  };

  return defaultProperties;
};

export { getDefaultProperties };
