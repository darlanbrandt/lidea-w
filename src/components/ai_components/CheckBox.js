import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBox() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Checkbox checked={checked} onChange={handleChange} value={checkled} />
    </div>
  );
}
