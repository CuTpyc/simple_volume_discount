import {Button, TextField,} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

export default function HelpTextExample() {
  const [textFieldValue, setTextFieldValue] = useState(
    'New funell',
  );

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <>
      <TextField
        label="Name"
        type="text"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        helpText="Enter the offer name"
        autoComplete="off"
      />
      <input type="hidden" name="returnedStatus" value={String(textFieldValue)}/>
    </>


  );
}
