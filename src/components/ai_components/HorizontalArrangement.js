import React from 'react';

export default function HorizontalArrangement(
  { componentName, componentProperties },
  { children }
) {
  return <div id={componentName}>{children}</div>;
}
