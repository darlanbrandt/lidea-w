const dict = [];

const getProperty = "(get-property '";
const getVarValue = '(get-var g';
let componentProperty = '';

dict["(set-and-coerce-property! '"] = 'set-property';
dict['(set-var! g'] = 'set-var-value';

//(let ( ($y2 (get-var g$y))  )   (forrange $number (begin   (set-lexical! $y2 (call-yail-primitive * (*list-for-runtime* (get-var g$y) (lexical-value $number) ) '(number number ) \"*\"))(set-and-coerce-property! 'L2 'Text (lexical-value $y2) 'text)(set-and-coerce-property! 'HA1 'BackgroundColor -16776961 'number)(set-and-coerce-property! 'VA2 'BackgroundColor -39424 'number)) 1 5 1)
//"(set-and-coerce-property! 'L1 'Text (get-var g$x) 'text)(set-and-coerce-property! 'TB1 'Text (get-property 'L1 'Text) 'text)(set-and-coerce-property! 'TB1 'BackgroundColor -4144960 'number)(set-var! g$x (call-yail-primitive - (*list-for-runtime* (get-var g$x) 1) '(number number) \"-\")"

const getComponentCode = (componentName, blocksData) => {
  const variables = blocksData.map(({ variables }) => {
    return variables;
  });

  const componentCodeBlock = blocksData.map(({ commands }) => {
    const codeBlock = commands.find(
      (prop) => prop.componentName === componentName
    );
    return codeBlock;
  });

  const command = componentCodeBlock.map(({ command }) => {
    return command;
  });
  console.log(command);

  const commandText = JSON.stringify(command);

  for (let i = 0; i < commandText.length; i++) {
    Object.keys(dict).forEach((key) => {
      if (commandText.startsWith(key, i)) {
        if (dict[key] === 'set-property') {
          let componentNameAction = commandText
            .substring(i + key.length)
            .split(' ')[0];
          console.log(componentNameAction);
          let componentPropertyAction = commandText
            .substring(i + key.length + componentNameAction.length + 2)
            .split(' ')[0];
          console.log(componentPropertyAction);
          let varPropertyValue = commandText
            .substring(
              i +
                key.length +
                componentNameAction.length +
                2 +
                componentPropertyAction.length +
                1
            )
            .split(')')[0];

          if (varPropertyValue.startsWith(getProperty)) {
            let cName = varPropertyValue
              .substring(getProperty.length)
              .split(' ')[0];

            componentProperty = varPropertyValue
              .substring(getProperty.length + cName.length + 2)
              .split(' ')[0];
            console.log(componentProperty);

            /*variableValue = {
              componentName: componentName,
              componentProperty: componentProperty,
            };*/
          } else if (varPropertyValue.startsWith(getVarValue)) {
            let varName = varPropertyValue
              .substring(getVarValue.length + 1)
              .split(' ')[0];
            console.log(varName);
          } else {
            componentProperty = varPropertyValue.split(' ')[0];
            console.log(componentProperty);
          }

          /*variableInfo = {
            variableName: variableName,
            variableValue: variableValue,
          };
          variables = variables.concat(variableInfo);*/
        } else if (dict[key] === 'set-var-value') {
          console.log('olá');
        }
      }
    });
  }
};

export { getComponentCode };
