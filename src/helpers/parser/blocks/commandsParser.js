const dict = [];

const getProperty = "(get-property '";
const getGlobalVarValue = '(get-var g';
const getScopeVarValue = '(lexical-value ';
let componentProperty = '';
let commandInfo = {};
let commandsSetProperty = [];
let allCommands = [];

dict["(set-and-coerce-property! '"] = 'set-property';
dict['(set-var! g'] = 'set-global-var-value';
dict['(let ( ('] = 'declare-scope-variable';

//(let ( ($y2 (get-var g$y))  )   (forrange $number (begin   (set-lexical! $y2 (call-yail-primitive * (*list-for-runtime* (get-var g$y) (lexical-value $number) ) '(number number ) \"*\"))(set-and-coerce-property! 'L2 'Text (lexical-value $y2) 'text)(set-and-coerce-property! 'HA1 'BackgroundColor -16776961 'number)(set-and-coerce-property! 'VA2 'BackgroundColor -39424 'number)) 1 5 1)
//"(set-and-coerce-property! 'L1 'Text (get-var g$x) 'text)(set-and-coerce-property! 'TB1 'Text (get-property 'L1 'Text) 'text)(set-and-coerce-property! 'TB1 'BackgroundColor -4144960 'number)(set-var! g$x (call-yail-primitive - (*list-for-runtime* (get-var g$x) 1) '(number number) \"-\")"

const getBlocksCommands = (commands) => {
  commands.forEach((block) => {
    const commandBlock = block.map((commandBlock) => {
      return commandBlock;
    });

    commandBlock.forEach((command) => {
      let commandText = command.command;
      console.log(command.componentName);
      console.log(commandText);
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

              let propertyValue = '';

              if (varPropertyValue.startsWith(getProperty)) {
                let cName = varPropertyValue
                  .substring(getProperty.length)
                  .split(' ')[0];
                console.log(cName);
                componentProperty = varPropertyValue
                  .substring(getProperty.length + cName.length + 2)
                  .split(' ')[0];
                console.log(componentProperty);
                propertyValue = {
                  component: cName,
                  property: componentProperty,
                };
              } else if (varPropertyValue.startsWith(getGlobalVarValue)) {
                let varName = varPropertyValue
                  .substring(getGlobalVarValue.length + 1)
                  .split(' ')[0];
                console.log(varName);
                propertyValue = { globalVariable: varName };
              } else {
                componentProperty = varPropertyValue.split(' ')[0];
                console.log(componentProperty);
                propertyValue = componentProperty;
              }
              commandInfo = {
                commandType: dict[key],
                componentAction: componentNameAction,
                propertyAction: componentPropertyAction,
                propertyValue: propertyValue,
              };
              commandsSetProperty = commandsSetProperty.concat(commandInfo);
            } else if (dict[key] === 'set-global-var-value') {
              let globalVariableName = commandText
                .substring(i + key.length + 1)
                .split(' ')[0];
              console.log(globalVariableName);
              console.log('olá');
            } else if (dict[key] === 'declare-scope-variable') {
              let scopeVariableName = commandText
                .substring(i + key.length + 1)
                .split(' ')[0];
              console.log(scopeVariableName);
              console.log('variável');
            }
          }
        });
      }
      allCommands.push({
        componentName: command.componentName,
        commands: commandsSetProperty,
      });
      commandsSetProperty = [];
      console.log(allCommands);
      return allCommands;
    });

    /*variableValue = {
            componentName: componentName,
            componentProperty: componentProperty,
          };
          } else if (varPropertyValue.startsWith(getGlobalVarValue)) {
            let varName = varPropertyValue
              .substring(getGlobalVarValue.length + 1)
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
        variables = variables.concat(variableInfo);*
        } else if (dict[key] === 'set-global-var-value') {
          console.log('olá');
        }
      }
    });
  }
    });
    /*const commandsText = commandBlocks.map(({ command }) => {
      return command;
    });
    console.log(commandsText);*/
  });

  /**/
};

export { getBlocksCommands };
