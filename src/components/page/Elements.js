import React from 'react';
import GridLayout from 'react-grid-layout';
import Button from '../ai_components/Button';
import Label from '../ai_components/Label';
import Image from '../ai_components/Image';
import TextBox from '../ai_components/TextBox';
import DatePicker from '../ai_components/DatePicker';
import Select from '../ai_components/Select';
import VerticalArrangement from '../ai_components/VerticalArrangement';
import HorizontalArrangement from '../ai_components/HorizontalArrangement';

export default function Elements({ components }) {
  console.log(components);
  let reactComponent = [];
  let childComponents = [];

  function childrenFromParent(parentComponent) {
    let children = [];
    for (let i = 0; i < components.length; i++) {
      Object.keys(childComponents).forEach((childKey) => {
        const child = childComponents[childKey];
        if (
          child.parentComponent === parentComponent &&
          child.componentName === components[i].componentName
        ) {
          children.push(getComponent(components[i].componentName));
        }
      });
    }
    return children;
  }

  for (let i = 0; i < components.length; i++) {
    for (let j = 0; j < components.length; j++) {
      if (components[i].parentComponent === components[j].componentName) {
        childComponents.push({
          componentName: components[i].componentName,
          componentType: components[i].componentType,
          parentComponent: components[i].parentComponent,
        });
      }
    }
  }

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
      case 'Date':
        component = (
          <DatePicker
            key={componentName}
            componentName={componentName}
            componentProperties={componentProperties(componentName)}
          />
        );

        break;
      case 'Select':
        component = (
          <Select
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
      default:
        break;
    }
    return component;
  }

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

  function pageComponents() {
    for (let i = 0; i < components.length; i++) {
      if (components[i].parentIsScreen) {
        reactComponent.push(getComponent(components[i].componentName));
      }
    }
    return reactComponent;
  }

  return <div className="content">{pageComponents()}</div>;
}
