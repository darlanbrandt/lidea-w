/****************************************************************************
 * Componente para representar o componente TableArrangement do App         *
 * Inventor.                                                                *
 *                                                                          *
 * Serve como uma table para inclusão de demais componentes internamente    *
 *                                                                          *
 * Utiliza MaterialUI para estilização da div.                                     *
 ****************************************************************************/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getDefaultProperties } from './helpers/commonPropertiesHelper';

export default function TableArrangement({
  componentName,
  componentProperties,
  children,
}) {
  const properties = getDefaultProperties(componentProperties);

  // Retorna quantidade de linhas da tabela
  const componentRow = componentProperties.find(
    (prop) => prop.propertyName === 'Rows'
  );
  let rows = componentRow !== undefined ? componentRow.propertyValue : '';

  // Retorna quantidade de colunas da tabela
  const componentColumn = componentProperties.find(
    (prop) => prop.propertyName === 'Columns'
  );
  let columns =
    componentColumn !== undefined ? componentColumn.propertyValue : '';

  // Retorna novo objeto com propriedades dos elementos na tabela para posicionamento
  const childrenProps = children.map(({ props }) => {
    let properties = props.componentProperties.map(
      ({ propertyName, propertyValue }) => {
        return {
          propertyName,
          propertyValue,
        };
      }
    );

    const componentRow = properties.find((prop) => prop.propertyName === 'Row');
    let row = componentRow !== undefined ? componentRow.propertyValue : '';

    const componentColumn = properties.find(
      (prop) => prop.propertyName === 'Column'
    );
    let column =
      componentColumn !== undefined ? componentColumn.propertyValue : '';

    return {
      name: props.componentName,
      column: column,
      row: row,
    };
  });

  // Criação de objeto com componentes posicionados para uso na geração da tabela
  let rowNumber = 0;
  let columnNumber = 0;
  let tableColumns = [];
  let table = [];
  let tableComponent = '';
  for (let i = 0; i < rows; i++) {
    rowNumber = i;
    for (let j = 0; j < columns; j++) {
      columnNumber = j;

      childrenProps.forEach(({ name, row, column }) => {
        if (row == i && column == j) {
          children.forEach((child) => {
            if (child.key === name) {
              tableComponent = child;
            }
          });
        }
      });
      tableColumns.push({
        element: 'Column',
        number: columnNumber,
        component: tableComponent,
      });
    }
    table.push({
      element: 'Row',
      number: rowNumber,
      columns: tableColumns,
    });
    tableColumns = [];
  }

  // Estilização do componente
  const useStyles = makeStyles(() => ({
    div: {
      display: 'flex',
      alignItems: properties.alignHorizontal,
      justifyContent: properties.alignVertical,
      backgroundColor: properties.bgColor,
      minHeight: properties.height,
      minWidth: properties.width,
    },
    invisible: {
      display: 'none',
    },
  }));

  const classes = useStyles();

  let componentClass = properties.visible
    ? `${classes.div}`
    : `${classes.invisible}`;

  return (
    <div className={componentClass} id={componentName}>
      <table>
        <tbody>
          {table.map((rowData, rowKey) => {
            return (
              <tr key={rowKey}>
                {rowData.columns.map((columnData, columnKey) => {
                  return (
                    <td key={columnKey + columnData.component}>
                      {columnData.component}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
