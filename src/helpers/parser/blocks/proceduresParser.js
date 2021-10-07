import { getBlocksCommands } from './commandsParser';

const dict = [];

const getProperty = "(get-property '";
const getGlobalVarValue = '(get-var g';
const getScopeVarValue = '(lexical-value ';
const operationIndicator = ' (call-yail-primitive';
let componentProperty = '';
let commandInfo = {};
let commandsSetProperty = [];

dict["(set-and-coerce-property! '"] = 'set-property';
dict['(set-var! g'] = 'set-global-var-value';
dict['(let ( ('] = 'declare-local-variable';

const getBlocksProcedures = (procedures) => {
  let procedureName = '';
  let procedureParameter = '';
  for (let procedure of procedures) {
    procedureName = procedure.procedureName;
    console.log(procedureName);
    procedureParameter = procedure.procedureParameter;
    console.log(getBlocksCommands(procedure.procedure));
  }
};

export { getBlocksProcedures };
