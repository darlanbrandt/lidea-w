import React from 'react';
import GridLayout from 'react-grid-layout';
import Button from '../ai_components/Button';
import Label from '../ai_components/Label';
//import Image from '../ai_components/Image';
import TextBox from '../ai_components/TextBox';
import DatePicker from '../ai_components/DatePicker';
import Select from '../ai_components/Select';

export default function Elements({ components }) {
  let reactElement = [];

  for (let i = 0; i < components.length; i++) {
    /*switch (components[i].componentType) {
      case 'Button':
        reactElement.push(
          <Button
            key={components[i].componentName}
            componentName={components[i].componentName}
            componentProperties={components[i].componentProperties}
          />
        );
        break;
      /*case 'Image':
        reactElement.push(
          <Image
            key={components[i].componentName}
            componentName={components[i].componentName}
            componentProperties={components[i].componentProperties}
          />
        );
        break;
      case 'Label':
        reactElement.push(
          <Label
            key={components[i].componentName}
            componentName={components[i].componentName}
            componentProperties={components[i].componentProperties}
          />
        );
        break;
      case 'TextBox':
        reactElement.push(
          <TextBox
            key={components[i].componentName}
            componentName={components[i].componentName}
            componentProperties={components[i].componentProperties}
          />
        );
        break;
      case 'Date':
        reactElement.push(
          <DatePicker
            key={components[i].componentName}
            componentName={components[i].componentName}
            componentProperties={components[i].componentProperties}
          />
        );
        break;
      case 'Select':
        reactElement.push(
          <Select
            key={components[i].componentName}
            componentName={components[i].componentName}
            componentProperties={components[i].componentProperties}
          />
        );
        break;
      default:
        reactElement.push(<span>Componente</span>);
        break;
    }*/
  }

  return (
    <center>
      <div className="content">{reactElement}</div>
    </center>
  );
}
