import { getBlocksCommands } from '../../../helpers/parser/blocks/commandParser';

// Aplica um único comando DOM da whitelist conhecida
function applySingleCommand(cmd) {
  cmd = cmd.trim();
  if (!cmd) return;

  // document.querySelector("#id").style.prop = "value"
  let m = cmd.match(/^document\.querySelector\("#([\w]+)"\)\.style\.([\w]+)\s*=\s*"([^"]*)"$/);
  if (m) {
    const el = document.querySelector('#' + m[1]);
    if (el) el.style[m[2]] = m[3];
    return;
  }

  // document.querySelector("#id").textContent = "value"
  m = cmd.match(/^document\.querySelector\("#([\w]+)"\)\.textContent\s*=\s*"([^"]*)"$/);
  if (m) {
    const el = document.querySelector('#' + m[1]);
    if (el) el.textContent = m[2];
    return;
  }

  // document.querySelector("#id").value = "value"
  m = cmd.match(/^document\.querySelector\("#([\w]+)"\)\.value\s*=\s*"([^"]*)"$/);
  if (m) {
    const el = document.querySelector('#' + m[1]);
    if (el) el.value = m[2];
    return;
  }

  if (import.meta.env.DEV) {
    console.warn('[LIDEA-w] Comando não reconhecido (ignorado):', cmd);
  }
}

// Avalia if/else gerado pelo parser e aplica o ramo correto
function applyConditional(str) {
  const condMatch = str.match(/^if\s+\((true|false)\)\s+\{([\s\S]*?)\}/);
  if (!condMatch) return;

  const [fullMatch, condition, thenBody] = condMatch;

  if (condition === 'true') {
    thenBody.split('; ').forEach(applySingleCommand);
    return;
  }

  const elseMatch = str.substring(fullMatch.length).match(/\s+else\s+\{([\s\S]*)\}/);
  if (elseMatch) {
    elseMatch[1].split('; ').forEach(applySingleCommand);
  }
}

// Substitui eval(): aplica somente operações DOM conhecidas
function applySafeCommands(commandString) {
  const str = (commandString || '').trim();
  if (!str) return;

  if (str.startsWith('if ')) {
    applyConditional(str);
  } else {
    str.split('; ').forEach(applySingleCommand);
  }
}

function handleAction(action, componentName, blocks) {
  const commands = blocks.map(({ commands }) => commands);
  const variables = blocks.map(({ variables }) => variables);

  commands.forEach((command) => {
    command.forEach((c) => {
      if (c.commandType === action && c.componentAction === componentName) {
        const execute = getBlocksCommands(c.commandsToExecute, variables).toString();
        applySafeCommands(execute);
      }
    });
  });
}

export { handleAction };
