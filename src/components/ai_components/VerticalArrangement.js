import React from 'react';

export default function VerticalArrangement(
  { componentName, componentProperties },
  { children }
) {
  return <div id={componentName}>{children}</div>;
}
