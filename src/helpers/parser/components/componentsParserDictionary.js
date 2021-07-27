const dict = [];

dict['Button '] = 'Button';
dict['Camera '] = 'Camera';
dict['Canvas '] = 'Canvas';
dict['Clock '] = 'Clock';
dict['CheckBox '] = 'Checkbox';
dict['DatePicker '] = 'Date';
dict['HorizontalArrangement '] = 'HorizontalArrangement';
dict['Image '] = 'Image';
dict['ImageSprite '] = 'ImageSprite';
dict['Label '] = 'Label';
dict['ListPicker '] = 'Select';
dict['PasswordTextBox '] = 'Password';
dict['Slider '] = 'Slider';
dict['Sound '] = 'Sound';
dict['Spinner '] = 'Spinner';
dict['Switch '] = 'Switch';
dict['TableArrangement '] = 'TableArrangement';
dict['TextBox '] = 'TextBox';
dict['VerticalArrangement '] = 'VerticalArrangement';

const startOfElement = '(add-component';
const endOfElement = ')\\n\\n)\\n\\n';

const commonTextComponent = 'com.google.appinventor.components.runtime.';
const commonTextProperties = "\\n(set-and-coerce-property! '";
const commonTextScreenTitle =
  "(do-after-form-creation (set-and-coerce-property! '";
const screenTextProperties = "(set-and-coerce-property! '";

export {
  dict,
  startOfElement,
  endOfElement,
  commonTextComponent,
  commonTextProperties,
  commonTextScreenTitle,
  screenTextProperties,
};
