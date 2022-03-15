import React, { useContext } from 'react';
import ContentContext from '../../context/ContentContext';
import Button from '../ai_components/Button';
import CheckBox from '../ai_components/CheckBox';
import Label from '../ai_components/Label';
import Image from '../ai_components/Image';
import TextBox from '../ai_components/TextBox';
import ListPicker from '../ai_components/ListPicker';
import DatePicker from '../ai_components/DatePicker';
import VerticalArrangement from '../ai_components/VerticalArrangement';
import HorizontalArrangement from '../ai_components/HorizontalArrangement';
import TableArrangement from '../ai_components/TableArrangement';
import Slider from '../ai_components/Slider';
import PasswordTextBox from '../ai_components/PasswordTextBox';
import Switch from '../ai_components/Switch';
import Spinner from '../ai_components/Spinner';
import TimePicker from '../ai_components/TimePicker';

/****************************************************************************
 * Componente responsável pela listagem e posicionamento dos componentes    *
 * App Inventor, convertidos em componente React, na página, passando suas  *
 * propriedades e demais dados.                                             *
 ****************************************************************************/

export default function ElementsContainer() {
  const { components } = useContext(ContentContext);
  console.table(components);
  let reactComponent = [];

  // Lista quais são os componentes filhos de algum outro componente
  function childrenComponents(components) {
    let children = [];
    components.forEach((childComponent) => {
      components.forEach((parentComponent) => {
        if (childComponent.parentComponent === parentComponent.componentName) {
          children.push({
            componentName: childComponent.componentName,
            componentType: childComponent.componentType,
            parentComponent: childComponent.parentComponent,
          });
        }
      });
    });
    return children;
  }

  let childComponents = childrenComponents(components);

  // Insere os componentes filhos a um array correspondente ao componente pai
  function childrenFromParent(parentComponent) {
    let children = [];
    components.forEach((component) => {
      Object.keys(childComponents).forEach((childKey) => {
        const child = childComponents[childKey];
        if (
          child.parentComponent === parentComponent &&
          child.componentName === component.componentName
        ) {
          children.push(getComponent(component.componentName));
        }
      });
    });

    return children;
  }

  // Retorna o tipo do componente
  function componentType(componentName) {
    let type = {};
    Object.keys(components).forEach((component) => {
      const comp = components[component];
      if (comp.componentName === componentName) {
        type = comp.componentType;
      }
    });
    return type;
  }

  // Retorna as propriedades do componente
  function componentProperties(componentName) {
    let properties = {};
    Object.keys(components).forEach((component) => {
      const comp = components[component];
      if (comp.componentName === componentName) {
        properties = comp.componentProperties;
      }
    });
    return properties;
  }

  // Retorna um componente React de acordo com o tipo do componente App Inventor
  function getComponent(componentName) {
    let component = null;
    switch (componentType(componentName)) {
      case 'Button':
        component = (
          <Button
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );
        break;
      case 'CheckBox':
        component = (
          <CheckBox
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'Image':
        component = (
          <Image
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'Label':
        component = (
          <Label
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'TextBox':
        component = (
          <TextBox
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'Password':
        component = (
          <PasswordTextBox
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'Date':
        component = (
          <DatePicker
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'Time':
        component = (
          <TimePicker
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;

      case 'Select':
        component = (
          <ListPicker
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'Spinner':
        component = (
          <Spinner
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'Slider':
        component = (
          <Slider
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'Switch':
        component = (
          <Switch
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'VerticalArrangement':
        component = (
          <VerticalArrangement
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}>
            {childrenFromParent(componentName)}
          </VerticalArrangement>
        );
        break;
      case 'HorizontalArrangement':
        component = (
          <HorizontalArrangement
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}>
            {childrenFromParent(componentName)}
          </HorizontalArrangement>
        );
        break;
      case 'TableArrangement':
        component = (
          <TableArrangement
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}>
            {childrenFromParent(componentName)}
          </TableArrangement>
        );
        break;
      default:
        break;
    }
    return component;
  }

  // Lista os componentes já posicionados de acordo com o componente pai
  function pageComponents() {
    reactComponent = [];
    components.forEach((component) => {
      if (component.parentIsScreen) {
        reactComponent.push(getComponent(component.componentName));
      }
    });

    return reactComponent;
  }

  return <div className="content">{pageComponents()}</div>;
}
